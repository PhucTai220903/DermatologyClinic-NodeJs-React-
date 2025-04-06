import axios from "axios";

const API_CITY_URL = "https://provinces.open-api.vn/api/?depth=1";
const API_DISTRICT_URL = "https://provinces.open-api.vn/api/p";

class CityAPI {
  async getAllCity() {
    const response = await axios.get(API_CITY_URL);
    return response.data;
  }

  async getDistricts(provinceCode: string) {
    const response = await axios.get(
      `${API_DISTRICT_URL}/${provinceCode}?depth=2`
    );
    return response.data.districts || [];
  }
}

export default new CityAPI();
