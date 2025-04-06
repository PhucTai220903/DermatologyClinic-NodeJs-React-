import { useState } from "react";
import AuthAPI from "../../api/auth.api";
import * as showNotification from "../../utils/toast.util";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/auth.api";
import { showErrorToast, showSuccessToast } from "../../utils/toast.util";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  age: string;
  gender: string;
}

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isOpenModalRegister, setIsOpenModalRegister] = useState(false);
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      showNotification.showErrorToast("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const response = await AuthAPI.login(username, password);
    if (response.status === 200) {
      showNotification.showSuccessToast(response.data.message);
      console.log(response.data.message);

      navigate("/verifyOtp");
    } else {
      showNotification.showErrorToast(response.data.message);
    }
  };

  const handleRegisterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await authApi.register(registerForm);
    if (response.status === 201) {
      showSuccessToast(response.data.message);
      setIsOpenModalRegister(false);
      setRegisterForm({
        name: "",
        email: "",
        password: "",
        age: "",
        gender: "",
      });
    } else {
      showErrorToast(response.data.message);
    }
  };

  return (
    <div className="login-frame mx-auto">
      <h2 className="login-title">Đăng Nhập</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Tên đăng nhập:
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Mật khẩu:
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-danger w-100">
          ĐĂNG NHẬP
        </button>
        <h5 className="mt-4">
          Bạn chưa có tài khoản?
          <a
            className="text-danger btn btn-link fw-bold "
            onClick={() => setIsOpenModalRegister(true)}
          >
            {" "}
            Đăng ký ngay
          </a>
        </h5>
      </form>
      {isOpenModalRegister && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Đăng ký tài khoản</h5>
                <button
                  className="btn-close"
                  onClick={() => setIsOpenModalRegister(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label className="form-label">Họ và tên</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={registerForm.name}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={registerForm.email}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mật khẩu</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tuổi</label>
                    <input
                      type="number"
                      className="form-control"
                      name="age"
                      value={registerForm.age}
                      onChange={handleRegisterChange}
                      required
                      min="1"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Giới tính</label>
                    <select
                      className="form-control"
                      name="gender"
                      value={registerForm.gender}
                      onChange={handleRegisterChange}
                      required
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-danger">
                      Đăng ký
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary text-white"
                      onClick={() => setIsOpenModalRegister(false)}
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInForm;
