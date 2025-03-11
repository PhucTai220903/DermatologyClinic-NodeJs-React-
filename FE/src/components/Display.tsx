import axios from "axios";

const API_USER_URL = "/api/users";

export const displayText = (tabId: string) => {
  if (tabId === "nav-doctor-tab") {
    return getAllUsers();
  }
  if (tabId === "nav-pharmacist-tab") {
    return <h1>World</h1>;
  }
  if (tabId === "nav-customer-tab") {
    return <h1>Chan</h1>;
  }
  return null;
};

// Hàm fetch data từ API
const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_USER_URL}/getAll`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return "Lỗi tải dữ liệu";
  }
};
