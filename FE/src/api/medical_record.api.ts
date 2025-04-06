import axios from "axios";

const API_MEDICAL_RECORD_DATA = "/api/medical_record";

class Medical_recordAPI {
  async getMedical_recordByIdCustomer(_id: string) {
    try {
      const response = await axios.post(
        `${API_MEDICAL_RECORD_DATA}/getByCustomerId`,
        { _id }
      );

      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message || "Đã xảy ra lỗi!");
    }
  }

  async getById(_id: string) {
    try {
      const response = await axios.get(
        `${API_MEDICAL_RECORD_DATA}/getById/${_id}`
      );
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message || "Đã xảy ra lỗi!");
    }
  }

  async add(data: any, appointmentId?: string) {
    try {
      if (appointmentId) {
        data.appointment_id = appointmentId;
      }

      const response = await axios.post(`${API_MEDICAL_RECORD_DATA}/add`, data);
      return response;
    } catch (error: any) {
      throw new Error(error.response.data.message || "Đã xảy ra lỗi!");
    }
  }

  async exportPDF(medical_record_id: string) {
    try {
      const response = await axios.post(
        `${API_MEDICAL_RECORD_DATA}/export_record`,
        { medical_record_id },
        { responseType: "blob" } // Bắt buộc để xử lý file PDF
      );
      return response.data;
    } catch (error: any) {
      return error.response;
    }
  }
}

export default new Medical_recordAPI();
