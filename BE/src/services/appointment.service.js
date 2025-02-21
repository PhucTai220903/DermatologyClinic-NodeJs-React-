const _appointmentRepository = require("../repositories/appointment.repository");

class appointmentService {
    async getAll() {
        return await _appointmentRepository.getAll();
    }

    async getById(id) {
        return await _appointmentRepository.getById(id);
    }

    async add(entity) {
        await _appointmentRepository.add(entity);
        return "Thêm thành công";
    }

    async update(id, entity) {
        await _appointmentRepository.update(id, entity);
        return "Đã cập nhật thành công";
    }

    async delete(id) {
        await _appointmentRepository.delete(id);
        return "Đã xóa thành công";
    }
}

module.exports = new appointmentService();
