import axios from "axios";

const API_URL = "/api/transaction";

class TransactionApi {
  async getAll() {
    try {
      const response = await axios.get(`${API_URL}/getAll`);
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
}

export default new TransactionApi();
