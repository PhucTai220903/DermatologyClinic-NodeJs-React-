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

module.exports = {
    userRepository: new UserRepository(),
    appointmentRepository: new AppointmentRepository(),
    comesticRepository: new ComesticRepository()
};
