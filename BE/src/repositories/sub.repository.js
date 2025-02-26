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
}

class MedicineRepository extends BaseRepository {
    constructor() {
        super("Medicine");
    }
}

class Medical_RecordRepository extends BaseRepository {
    constructor() {
        super("Medical_Record");
    }
}

module.exports = {
    userRepository: new UserRepository(),
    appointmentRepository: new AppointmentRepository(),
    comesticRepository: new ComesticRepository(),
    medicineRepository: new MedicineRepository(),
    medical_RecordRepository: new Medical_RecordRepository()
};
