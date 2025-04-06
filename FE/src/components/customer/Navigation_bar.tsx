import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navigation_bar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
    window.location.reload();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="nav-bar">
      <div className="rectangle-1"></div>
      <div className="navigation">
        <div className="nav-items">
          <div className="logo">
            <div className="oskin-tr-m-n-chu-n-y-khoa2">
              <span>
                <span className="oskin-tr-m-n-chu-n-y-khoa-2-span"></span>
                <span className="oskin-tr-m-n-chu-n-y-khoa-2-span2">
                  OSKIN
                  <br />
                </span>
                <span className="oskin-tr-m-n-chu-n-y-khoa-2-span3">
                  TRỊ MỤN CHUẨN Y KHOA
                </span>
              </span>
            </div>
          </div>
          <Link to="/" className="trang-ch2" style={{ textDecoration: "none" }}>
            Trang chủ
          </Link>
          <Link
            to="/comestic"
            className="s-n-ph-m2"
            style={{ textDecoration: "none" }}
          >
            Sản phẩm
          </Link>
          <Link
            to="/appointment"
            className="t-l-ch-t-v-n"
            style={{ textDecoration: "none" }}
          >
            Đặt lịch tư vấn
          </Link>
          <Link
            to="/diagnosis"
            className="chu-n-o-n"
            style={{ textDecoration: "none" }}
          >
            Chuẩn đoán
          </Link>
          <Link
            to="/cart"
            className="mua-h-ng"
            style={{ textDecoration: "none" }}
          >
            Giỏ hàng
          </Link>
        </div>
        {!user ? (
          <div className="sign-in">
            <Link
              to="/login"
              className="text-danger fw-bold"
              style={{ textDecoration: "none" }}
            >
              Đăng nhập
            </Link>
          </div>
        ) : (
          <div className="sign-in">
            <div
              className="fw-bold text-dark"
              style={{ cursor: "pointer" }}
              onClick={toggleDropdown}
            >
              Thông tin ⬇
            </div>

            {isOpen && (
              <ul
                className="list-unstyled position-absolute bg-white shadow rounded p-2"
                style={{
                  minWidth: "150px",
                  border: "1px solid #ddd",
                  zIndex: 1,
                  marginTop: "200px",
                }}
              >
                <li className="p-2">
                  <Link
                    to="/information"
                    className="fw-bold text-dark text-decoration-none"
                    onClick={() => setIsOpen(false)}
                  >
                    Cá nhân
                  </Link>
                </li>
                <li className="p-2">
                  <Link
                    to="/order"
                    className="fw-bold text-dark text-decoration-none"
                    onClick={() => setIsOpen(false)}
                  >
                    Đơn hàng
                  </Link>
                </li>
                <li className="p-2">
                  <a
                    onClick={handleLogout}
                    className="text-danger fw-bold"
                    style={{ cursor: "pointer", textDecoration: "none" }}
                  >
                    Đăng xuất
                  </a>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation_bar;
