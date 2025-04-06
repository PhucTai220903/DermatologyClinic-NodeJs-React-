import axios from "axios";
import { Appointment } from "../models/appointment.model";

const API_APPOINTMENT_URL = "/api/appointment";

class AppointmentAPI {
  async getAll() {
    try {
      const response = await axios.get(`${API_APPOINTMENT_URL}/getAll`);
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async getByStatus(status: string) {
    try {
      const response = await axios.get(
        `${API_APPOINTMENT_URL}/getByStatus/${status}`
      );
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
  async update(_id: string, status: string) {
    try {
      const response = await axios.put(`${API_APPOINTMENT_URL}/update/${_id}`, {
        status: status,
      });
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async createAppointment(appointment?: any) {
    try {
      const response = await axios.post(
        `${API_APPOINTMENT_URL}/addByCustomer`,
        appointment
      );
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async addByPharmacist(appointment?: any) {
    try {
      const response = await axios.post(
        `${API_APPOINTMENT_URL}/addByPharmacist`,
        appointment
      );
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
}

export default new AppointmentAPI();
