const _repository = require("../repositories/sub.repository");

class appointmentService {
    async getAll() {
        return await _repository.appointmentRepository.getAll();
    }

    async getById(id) {
        return await _repository.appointmentRepository.getById(id);
    }

    async add(entity) {
        await _repository.appointmentRepository.add(entity);
        return "Thêm thành công";
    }

    async update(id, entity) {
        await _repository.appointmentRepository.update(id, entity);
        return "Đã cập nhật thành công";
    }

    async delete(id) {
        await _repository.appointmentRepository.delete(id);
        return "Đã xóa thành công";
    }
}

module.exports = new appointmentService();
