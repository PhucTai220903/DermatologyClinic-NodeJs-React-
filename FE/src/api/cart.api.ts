import axios from "axios";

const API_CART_URL = "/api/cart";

class CartAPI {
  async get() {
    const response = await axios.get(`${API_CART_URL}/get`);
    return response.data;
  }

  async add(comestic_id: string, quantity: number) {
    try {
      const response = await axios.post(`${API_CART_URL}/add`, {
        comestic_id,
        quantity,
      });
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async delete(comestic_id: string) {
    try {
      const response = await axios.delete(
        `${API_CART_URL}/delete/${comestic_id}`
      );
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
}

export default new CartAPI();
