import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const API_OTP_URL = "/api/otp";

export const useOtpAPI = () => {
  const { login } = useAuth();

  const verifyOtp = async (otp: string) => {
    try {
      const response = await axios.post(`${API_OTP_URL}/verifyOTP`, { otp });
      if (response.status === 200) {
        login(response.data.token); // ✅ Lưu JWT sau khi xác thực thành công
      }
      return response;
    } catch (error: any) {
      throw Object.assign(new Error(error.response), {
        status: 401,
      });
    }
  };

  return { verifyOtp };
};
