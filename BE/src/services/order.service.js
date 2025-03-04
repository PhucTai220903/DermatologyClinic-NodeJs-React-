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

        let totalAmount = 0;

        let itemsWithDetails = [];

        for (const item of orderRequest.items) {
            let itemTotal = item.price * (item.quantity || 1);
            totalAmount += itemTotal;

            let existingMedicine = await _repository.medicineRepository.getById(item.item_id);
            if (existingMedicine) {
                await _repository.medicineRepository.updateQuantity(item.item_id, item.quantity);
            } else {
                let existingCosmetic = await _repository.comesticRepository.getById(item.item_id);
                if (existingCosmetic) {
                    await _repository.comesticRepository.updateQuantity(item.item_id, item.quantity);
                }
            }

            itemsWithDetails.push({
                item_id: item.item_id,
                item_name: item.item_name,
                type: item.type,
                quantity: item.quantity || 1,
                price: item.price
            });
        }


        let currentUserEntity = await _repository.userRepository.getById(currentUser.id);
        if (currentUserEntity.membership.points < orderRequest.points_use)
            throw Object.assign(new Error("Điểm bạn muốn sử dụng vượt quá số điểm hiện tại của bạn"), { status: 500 });

        let membershipLevel = currentUserEntity.membership.level;
        let discountRate = 0;
        switch (membershipLevel) {
            case Membership_levelENUM.GOLD:
                discountRate = 0.1;
                break;
            case Membership_levelENUM.SILVER:
                discountRate = 0.08;
                break;
            case Membership_levelENUM.BRONZE:
                discountRate = 0.06;
                break;
            default:
                discountRate = 0;
        }

        let discountApplied = (totalAmount * discountRate) + orderRequest.points_use;
        const finalAmount = totalAmount - discountApplied;

        // Add order
        let newOrder = new Order({
            customer_id: orderRequest.customer_id,
            items: itemsWithDetails,
            total_amount: totalAmount,
            discount_applied: discountApplied,
            final_amount: finalAmount,
            payment_method: orderRequest.payment_method
        });

        await _repository.orderRepository.add(newOrder);

        // Add transaction
        const addToTransactionEntity = new Transaction(
            {
                customer_id: orderRequest.customer_id,
                order_id: newOrder.id,
                amount: finalAmount,
                points_earned: finalAmount / 100,
                points_used: orderRequest.points_use,
                payment_method: orderRequest.payment_method,
            }
        );

        await _transactionService.add(addToTransactionEntity);

        // Update member point and level
        currentUserEntity.membership.points += (finalAmount / 100) - orderRequest.points_use;
        currentUserEntity.membership.total_spent += finalAmount;
        if (currentUserEntity.membership.total_spent >= 30000000) {
            currentUserEntity.membership.level = Membership_levelENUM.GOLD;
        } else if (currentUserEntity.membership.total_spent >= 15000000) {
            currentUserEntity.membership.level = Membership_levelENUM.SILVER;
        } else if (currentUserEntity.membership.total_spent >= 5000000) {
            currentUserEntity.membership.level = Membership_levelENUM.BRONZE;
        } else {
            currentUserEntity.membership.level = Membership_levelENUM.MEMBER;
        }
        currentUserEntity.membership.last_transaction = Date.now();

        await _repository.userRepository.update(currentUserEntity.id, currentUserEntity);

        return "Thêm đơn thành công";
    }
}

module.exports = new OrderService();