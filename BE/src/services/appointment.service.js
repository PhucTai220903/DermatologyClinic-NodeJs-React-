const _repository = require("../repositories/sub.repository");
const User = require("../models/user.model");

class appointmentService {
  async getAll() {
    return await _repository.appointmentRepository.getAll();
  }

  async getById(id) {
    return await _repository.appointmentRepository.getById(id);
  }

  async add(customer_id, entity) {
    if (!entity || !customer_id || !entity.doctor_id) {
      throw new Error("Dữ liệu không hợp lệ");
    }

    // Tìm cả khách hàng và bác sĩ cùng lúc để tối ưu tốc độ
    const [existingCustomer, existingDoctor] = await Promise.all([
      User.findById(customer_id),
      User.findById(entity.doctor_id),
    ]);

    if (!existingCustomer)
      throw Object.assign(new Error("Không tìm thấy khách hàng này"), {
        status: 404,
      });

    if (!existingDoctor)
      throw Object.assign(new Error("Không tìm thấy bác sĩ này"), {
        status: 404,
      });

    entity.customer_id = customer_id;

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
