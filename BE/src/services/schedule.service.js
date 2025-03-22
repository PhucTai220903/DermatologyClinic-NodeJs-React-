const _repository = require("../repositories/sub.repository");
const dayjs = require("dayjs");

class ScheduleService {
  async getDoctorsByDate() {
    const today = dayjs().format("YYYY-MM-DD");
    return await _repository.scheduleRepository.getDoctorsByDate(today);
  }

  async getByDoctorId(_id) {
    const existingDoctor = await _repository.userRepository.getById(_id);
    if (!existingDoctor)
      throw Object.assign(new Error("Không tồn tại bác sĩ này"));

    const scheduleToGet = await _repository.scheduleRepository.getByDoctorId(
      _id
    );
    return scheduleToGet;
  }

  async add(doctor_id, entity) {
    entity.doctor = doctor_id;
    await _repository.scheduleRepository.add(entity);
    return "Thêm thành công";
  }

  async update(entity) {
    const existingSchedule = await _repository.scheduleRepository.getById(
      entity.schedule_id
    );
    if (!existingSchedule) {
      throw Object.assign(new Error("Không tìm thấy lịch trình này"));
    }

    const scheduleToUpdate = existingSchedule.schedules.find(
      (schedule) =>
        schedule.schedule_date.toISOString().split("T")[0] ===
        entity.schedule_date
    );

    if (!scheduleToUpdate) {
      throw Object.assign(new Error("Không tìm thấy lịch trình cần cập nhật"));
    }

    scheduleToUpdate.status = entity.status;

    await _repository.scheduleRepository.update(
      entity.schedule_id,
      existingSchedule
    );

    return "Cập nhật thành công";
  }
}

module.exports = new ScheduleService();
