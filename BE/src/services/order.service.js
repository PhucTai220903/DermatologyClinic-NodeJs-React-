const UserRoleENUM = require("../enums/userRole.enum");
const _repository = require("../repositories/sub.repository");
const Order = require("../models/order.model");
const Membership_levelENUM = require("../enums/membership_level.enum");
const _transactionService = require("../services/transaction.service");
const { Transaction } = require("../models");

class OrderService {
  async getAll() {
    return await _repository.orderRepository.getAll();
  }

  async getById(id) {
    return await _repository.orderRepository.getById(id);
  }

  async getByCustomerId(customer_id) {
    return await _repository.orderRepository.getByCustomerId(customer_id);
  }

  async add(currentUser, orderRequest) {
    if (currentUser.role === UserRoleENUM.CUSTOMER) {
      orderRequest.customer_id = currentUser.id;
    }

    let items = [];

    for (const item of orderRequest.items) {
      // Chỉ cần gán object, không dùng `new`
      let itemToAdd = {
        item_id: item.comestic_id,
        item_name: item.comestic_name,
        type: item.type,
        quantity: item.quantity,
        price: item.price,
      };

      items.push(itemToAdd);
    }

    // Add order
    let newOrder = new Order({
      customer_id: orderRequest.customer_id, // ok
      items: items, // ok
      total_amount: orderRequest.total_amount, // ok
      discount_applied: orderRequest.total_amount - orderRequest.final_amount,
      final_amount: orderRequest.final_amount,
      payment_method: orderRequest.payment_method,
    });

    if (orderRequest.address) {
      newOrder.address = orderRequest.address;
    }
    await _repository.orderRepository.add(newOrder);

    // Add transaction
    const addToTransactionEntity = new Transaction({
      customer_id: orderRequest.customer_id,
      order_id: newOrder.id,
      amount: orderRequest.final_amount,
      points_earned: orderRequest.final_amount / 100,
      points_used: orderRequest.points_used,
      payment_method: orderRequest.payment_method,
    });

    await _transactionService.add(addToTransactionEntity);

    // Update member point and level
    const currentUserEntity = await _repository.userRepository.getById(
      orderRequest.customer_id
    );
    currentUserEntity.membership.last_transaction = Date.now();

    await _repository.userRepository.update(
      currentUserEntity.id,
      currentUserEntity
    );

    return "Thêm đơn thành công";
  }
}

module.exports = new OrderService();
