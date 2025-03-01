const UserRoleENUM = require("../enums/userRole.enum");
const _repository = require("../repositories/sub.repository");
const Order = require("../models/order.model");
const Membership_levelENUM = require("../enums/membership_level.enum");

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

        let itemsWithDetails = orderRequest.items.map(item => {
            let itemTotal = item.price * (item.quantity || 1);
            totalAmount += itemTotal;

            return {
                item_id: item.item_id,
                item_name: item.item_name,
                type: item.type,
                quantity: item.quantity || 1,
                price: item.price
            };
        });

        let currentUserEntity = await _repository.userRepository.getById(currentUser.id);
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

        let discountApplied = totalAmount * discountRate;
        let finalAmount = totalAmount - discountApplied;

        let newOrder = new Order({
            customer_id: orderRequest.customer_id,
            items: itemsWithDetails,
            total_amount: totalAmount,
            discount_applied: discountApplied,
            final_amount: finalAmount,
            payment_method: orderRequest.payment_method
        });

        await _repository.orderRepository.add(newOrder);

        return "Thêm đơn thành công";
    }
}

module.exports = new OrderService();