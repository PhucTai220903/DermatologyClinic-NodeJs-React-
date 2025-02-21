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
}

module.exports = {
    userRepository: new UserRepository(),
    appointmentRepository: new AppointmentRepository(),
    comesticRepository: new ComesticRepository()
};
