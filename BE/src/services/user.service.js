const _repository = require("../repositories/sub.repository");
const dayjs = require("dayjs");

class UserService {
  async getAllByRole(role) {
    return await _repository.userRepository.getAllByRole(role);
  }

  async getById(id) {
    return await _repository.userRepository.getById(id);
  }

  async getDocTorsByDate(date) {
    const parsedDate = dayjs(date);

    const doctorsToGet = await _repository.userRepository.getDoctorsByDate(
      parsedDate
    );
    if (doctorsToGet.length === 0)
      throw Object.assign(
        new Error(
          "Không có bác sĩ nào làm việc vào thời điểm này. Vui lòng chọn ngày khác"
        ),
        { status: 404 }
      );

    return doctorsToGet;
  }

  async getCustomerByName(customerName) {
    const customerToGet = await _repository.userRepository.getCustomerByName(
      customerName
    );
    if (customerToGet.length === 0)
      throw Object.assign(new Error("Không tìm thấy khách hàng này"), {
        status: 404,
      });

    return customerToGet;
  }

  async add(entity) {
    await _repository.userRepository.add(entity);
    return "Thêm thành công";
  }

  async update(id, entity) {
    await _repository.userRepository.update(id, entity);
    return "Đã cập nhật thành công";
  }

  async delete(id) {
    await _repository.userRepository.delete(id);
    return "Đã xóa thành công";
  }
}

module.exports = new UserService();
