import { useState, useEffect } from "react";
import * as showNotification from "../../utils/toast.util";
import { useOtpAPI } from "../../api/otp.api";
import { useNavigate } from "react-router-dom";

const OTPForm = () => {
  const { verifyOtp } = useOtpAPI();
  const [otpCode, setOtpCode] = useState("");
  const [countdown, setCountdown] = useState(10);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) {
      showNotification.showErrorToast("Vui lòng nhập mã OTP!");
      return;
    }

    try {
      const response = await verifyOtp(otpCode);
      if (response.status === 200) {
        showNotification.showSuccessToast(response.data.message);
        switch (response.data.role) {
          case "doctor":
            navigate("/doctor");
            break;
          case "admin":
            navigate("/admin");
            break;
          case "pharmacist":
            navigate("/pharmacist");
            break;
          default:
            navigate("/");
        }
      } else {
        showNotification.showErrorToast(response.data.message);
      }
    } catch (error) {
      console.log(error);
      showNotification.showErrorToast("Xác thực thất bại, vui lòng thử lại!");
    }
  };

  return (
    <div className="login-frame mx-auto">
      <h2 className="login-title">Nhập mã OTP</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Nhập mã OTP"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
        />
        <div className="countdown-timer">
          {countdown > 0
            ? `Gửi lại mã sau: ${countdown}s`
            : "Bạn có thể gửi lại mã OTP!"}
        </div>
        <button type="submit" className="btn btn-danger w-100 mt-3">
          XÁC NHẬN
        </button>
      </form>
      {canResend && (
        <button
          className="btn btn-primary w-100 mt-3"
          onClick={() => {
            showNotification.showSuccessToast("Mã OTP mới đã được gửi!");
            setCountdown(10);
            setCanResend(false);
          }}
        >
          Gửi lại mã OTP
        </button>
      )}
    </div>
  );
};

export default OTPForm;
