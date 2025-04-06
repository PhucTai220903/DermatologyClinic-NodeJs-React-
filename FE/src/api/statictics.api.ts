import axios from "axios";

const API_URL = "/api/statistic";

class StatisticsApi {
  async getByWeek() {
    try {
      const response = await axios.post(`${API_URL}/getByWeek`);
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
}

export default new StatisticsApi();
