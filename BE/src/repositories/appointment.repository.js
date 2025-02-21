const Appointment = require("../models/appointment.model");

class AppointmentRepository {
    async getAll() {
        return await Appointment.find();
    }

    async getById(id) {
        return await Appointment.findById(id);
    }

    async add(appointmentData) {
        const appointment = new appointment(appointmentData);
        return await Appointment.save();
    }

    async update(id, appointmentData) {
        return await Appointment.findByIdAndUpdate(id, appointmentData, { new: true });
    }

    async delete(id) {
        return await Appointment.findByIdAndDelete(id);
    }
}

module.exports = new AppointmentRepository();
