import axios from "axios";

const API_MEDICINE_URL = "http://localhost:5000/api/medicine";

const medicineApi = {
  getAllMedicine: async () => {
    try {
      const response = await axios.get(API_BASE_URL/getAll);
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
};

export default medicineApi;
