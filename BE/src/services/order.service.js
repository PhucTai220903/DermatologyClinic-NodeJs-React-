const UserRoleENUM = require("../enums/userRole.enum");
const _repository = require("../repositories/sub.repository");

class OrderService {
    async getAll() {
        return await _repository.orderRepository.getAll();
    }

    async getById(id) {
        return await _repository.orderRepository.getById(id);
    }

    async add(currentUser, orderRequest) {
        // if(currentUser.role == UserRoleENUM.CUSTOMER)
        //     orderRequest.customer_id = currentUser.id;

        // let addedItems = await Promise.all(orderRequest.items.map(async(item) =>{
        //     let comestic = await _repository.comesticRepository.getById(item.comestic_id);
        //     let treatment = await _repository.
        // }));

        return "Thêm thành công";
    }
}

module.exports = new OrderService();