const _repository = require("../repositories/sub.repository");
const User = require("../models/user.model");

class appointmentService {
  async getAll() {
    return await _repository.appointmentRepository.getAll();
  }

  async getById(id) {
    return await _repository.appointmentRepository.getById(id);
  }

  async getByStatus(status) {
    return await _repository.appointmentRepository.getByStatus(status);
  }

  async add(customer_id, entity) {
    // Validate dữ liệu đầu vào
    if (!entity || !customer_id) {
      throw Object.assign(new Error("Không được để trống"), { status: 400 });
    } else if (!entity.doctor_id) {
      throw Object.assign(new Error("Danh mục bác sĩ không được để trống"), {
        status: 400,
      });
    }

    if (!entity.date) {
      // Validate ngày hẹn
      throw Object.assign(new Error("Vui lòng chọn ngày hẹn"), {
        status: 400,
      });
    }

    // Kiểm tra ngày hẹn không được trong quá khứ
    const appointmentDate = new Date(entity.date);
    const currentDate = new Date();
    if (appointmentDate < currentDate) {
      throw Object.assign(new Error("Ngày hẹn không được trong quá khứ"), {
        status: 400,
      });
    }

    // Kiểm tra ngày hẹn không được quá xa trong tương lai (ví dụ: 3 tháng)
    const maxFutureDate = new Date();
    maxFutureDate.setMonth(maxFutureDate.getMonth() + 3);
    if (appointmentDate > maxFutureDate) {
      throw Object.assign(
        new Error("Ngày hẹn không được quá 3 tháng trong tương lai"),
        { status: 400 }
      );
    }

    // Tìm cả khách hàng và bác sĩ cùng lúc để tối ưu tốc độ
    const [existingCustomer, existingDoctor] = await Promise.all([
      User.findById(customer_id),
      User.findById(entity.doctor_id),
    ]);

    // Kiểm tra khách hàng
    if (!existingCustomer) {
      throw Object.assign(new Error("Không tìm thấy khách hàng này"), {
        status: 404,
      });
    }
    if (existingCustomer.status === "banned") {
      throw Object.assign(new Error("Tài khoản của bạn đã bị khóa"), {
        status: 403,
      });
    }

    // Kiểm tra bác sĩ
    if (!existingDoctor) {
      throw Object.assign(new Error("Không tìm thấy bác sĩ này"), {
        status: 404,
      });
    }
    if (existingDoctor.role !== "doctor") {
      throw Object.assign(new Error("Người được chọn không phải là bác sĩ"), {
        status: 400,
      });
    }
    if (existingDoctor.status === "banned") {
      throw Object.assign(new Error("Tài khoản bác sĩ đã bị khóa"), {
        status: 403,
      });
    }

    // Kiểm tra lịch trùng
    // const exsistingSchedule =
    //   await _repository.scheduleRepository.getDoctorsByDate(appointmentDate);
    // if (exsistingSchedule.length === 0) {
    //   throw Object.assign(
    //     new Error("Bác sĩ không có lịch làm việc vào thời gian này"),
    //     { status: 400 }
    //   );
    // }

    // Kiểm tra số lần đặt lịch của khách hàng trong ngày
    /*const customerAppointments =
      await _repository.appointmentRepository.findByCustomerAndDate(
        customer_id,
        appointmentDate
      );
    if (customerAppointments.length >= 2) {
      throw Object.assign(
        new Error("Bạn đã đặt tối đa 2 lịch hẹn trong ngày này"),
        { status: 400 }
      );
    }*/

    // Thêm thông tin khách hàng vào entity
    entity.customer_id = customer_id;
    entity.status = "confirmed"; // Trạng thái mặc định khi đặt lịch

    // Thêm lịch hẹn mới
    await _repository.appointmentRepository.add(entity);
    return "Đặt lịch hẹn thành công";
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
