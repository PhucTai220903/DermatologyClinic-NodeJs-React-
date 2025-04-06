import axios from "axios";

const API_SCHEDULE_URL = "/api/schedule";

class ScheduleAPI {
  async getByDoctorId(doctorId: string) {
    try {
      const response = await axios.get(
        `${API_SCHEDULE_URL}/getByDoctorId/${doctorId}`
      );
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async add(date: any) {
    const schedules = date.map((item: any) => ({
      schedule_date: item.schedule_date,
    }));

    try {
      const response = await axios.post(`${API_SCHEDULE_URL}/add`, {
        schedules: schedules,
      });
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
}

export default new ScheduleAPI();
