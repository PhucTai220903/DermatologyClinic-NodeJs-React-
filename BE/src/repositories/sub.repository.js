const BaseRepository = require("./base.repository");

class UserRepository extends BaseRepository {
    constructor() {
        super("User");
    }
}

class AppointmentRepository extends BaseRepository {
    constructor() {
        super("Appointment");
    }
}

class ComesticRepository extends BaseRepository {
    constructor() {
        super("Comestic");
    }

    async sortByPrice(type) {
        return await this.model.find().sort({ price: type }); // 1 để sắp xếp tăng dần, -1 để sắp xếp giảm dần
    }

    async updateQuantity(id, quantity) {
        return await this.model.findByIdAndUpdate(id, { $inc: { quantity: -quantity } }, { new: true });
    }
    
}

class MedicineRepository extends BaseRepository {
    constructor() {
        super("Medicine");
    }

    async updateQuantity(id, quantity) {
        return await this.model.findByIdAndUpdate(id, { $inc: { quantity: -quantity } }, { new: true });
    }
    
}

class Medical_RecordRepository extends BaseRepository {
    constructor() {
        super("Medical_Record");
    }
}

class CartRepository extends BaseRepository {
    constructor() {
        super("Cart");
    }

    async getCartByCustomerId(currentCustomerId) {
        return await this.model.findOne({ customer_id: currentCustomerId });
    }
}

class OrderRepository extends BaseRepository {
    constructor() {
        super("Order");
    }

    async getByCustomerId(currentCustomerId) {
        return await this.model.find({ customer_id: currentCustomerId });
    }
}

class TreatmentRepository extends BaseRepository{
    constructor() {
        super("Treatment");
    }
}

class TransactionRepository extends BaseRepository{
    constructor() {
        super("Transaction");
    }
}

module.exports = {
    userRepository: new UserRepository(),
    appointmentRepository: new AppointmentRepository(),
    comesticRepository: new ComesticRepository(),
    medicineRepository: new MedicineRepository(),
    medical_RecordRepository: new Medical_RecordRepository(),
    cartRepository: new CartRepository(),
    orderRepository: new OrderRepository(),
    treatmentRepository: new TreatmentRepository(),
    transactionRepository: new TransactionRepository()
};
