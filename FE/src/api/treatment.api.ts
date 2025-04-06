import axios from "axios";
import { Treatment } from "../models/treatment.model";

const API_TREATMENT_URL = "/api/treatment";

class TreatmentAPI {
  async getAll() {
    const response = await axios.get(`${API_TREATMENT_URL}/getAll`);
    return response;
  }

  async getById(_id: string) {
    try {
      const response = await axios.get(`${API_TREATMENT_URL}/getById/${_id}`);
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async searchByName(name: string) {
    try {
      const response = await axios.post(`${API_TREATMENT_URL}/searchByName`, {
        name,
      });
      return response;
    } catch (error: any) {
      return error.response?.data?.message || "Đã xảy ra lỗi!";
    }
  }

  async add(treatment: Treatment): Promise<string> {
    try {
      const response = await axios.post(`${API_TREATMENT_URL}/add`, treatment);
      return response.data.message;
    } catch (error: any) {
      return error.response?.data?.message || "Đã xảy ra lỗi!";
    }
  }
}

export default new TreatmentAPI();
