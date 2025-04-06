import axios from "axios";
import { Comestic } from "../models/comestic.model";

const API_COMESTIC_URL = "/api/comestic";

class ComesticAPI {
  async getAllCometics() {
    const response = await axios.get(`${API_COMESTIC_URL}/getAll`);
    return response;
  }

  async addComestic(formData: FormData | Comestic): Promise<string> {
    try {
      const config = {
        headers: {
          "Content-Type":
            formData instanceof FormData
              ? "multipart/form-data"
              : "application/json",
        },
      };

      const response = await axios.post(
        `${API_COMESTIC_URL}/add`,
        formData,
        config
      );
      return response.data.message;
    } catch (error: any) {
      throw new Error(error.response.data.message || "Đã xảy ra lỗi!");
    }
  }

  async getComesticById(id: string) {
    try {
      const response = await axios.get(`${API_COMESTIC_URL}/getById/${id}`);
      return response;
    } catch (error: any) {
      return error.response?.data?.message || "Đã xảy ra lỗi!";
    }
  }

  async searchByName(name: string) {
    try {
      const response = await axios.post(`${API_COMESTIC_URL}/searchByName`, {
        name,
      });
      return response;
    } catch (error: any) {
      return error.response?.data?.message || "Đã xảy ra lỗi!";
    }
  }

  async updateComestic(id: string, comestic: Comestic) {
    try {
      const response = await axios.put(
        `${API_COMESTIC_URL}/update/${id}`,
        comestic
      );
      return response;
    } catch (error: any) {
      return error.response?.data?.message || "Đã xảy ra lỗi!";
    }
  }
}

export default new ComesticAPI();
