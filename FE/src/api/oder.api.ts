import axios from "axios";
const API_ORDER_URL = "/api/order";

class OrderApi {
  async getByCustomerId(customerId: string) {
    try {
      const response = await axios.get(
        `${API_ORDER_URL}/getByCustomerId/${customerId}`
      );
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
  async add(order: any) {
    try {
      const response = await axios.post(`${API_ORDER_URL}/add`, order);
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
}

export default new OrderApi();
