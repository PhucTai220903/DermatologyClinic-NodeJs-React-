import axios from "axios";

const API_URL = "/api/comestic";
class ReviewApi {
  async add(data: any) {
    try {
      const response = await axios.post(`${API_URL}/review`, data);
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  }
}

export default new ReviewApi();
