import logo from "/src/assets/admin/images/logo.svg";
import logoMini from "/src/assets/admin/images/logo-mini.svg";
import face1 from "/src/assets/admin/images/faces/face1.jpg";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function NavigationBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
        <div className="me-3">
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-bs-toggle="minimize"
          >
            <span className="icon-menu"></span>
          </button>
        </div>
        <div>
          <a className="navbar-brand brand-logo" href="/">
            <img src={logo} alt="logo" />
          </a>
          <a className="navbar-brand brand-logo-mini" href="/">
            <img src={logoMini} alt="logo" />
          </a>
        </div>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-top">
        <ul className="navbar-nav">
          <li className="nav-item font-weight-semibold d-none d-lg-block ms-0">
            <h1 className="welcome-text">
              Good Morning, <span className="text-black fw-bold">John Doe</span>
            </h1>
            <h3 className="welcome-sub-text">
              Your performance summary this week{" "}
            </h3>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item dropdown d-none d-lg-block p-3">
            <a
              className="nav-link dropdown-bordered dropdown-toggle dropdown-toggle-split"
              id="messageDropdown"
              href="#"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {" "}
              Select Category{" "}
            </a>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0"
              aria-labelledby="messageDropdown"
            >
              <a className="dropdown-item py-3">
                <p className="mb-0 font-weight-medium float-left">
                  Select category
                </p>
              </a>
            </div>
          </li>
          <li>
            <a onClick={handleLogout} style={{ cursor: "pointer" }}>
              Đăng xuất
            </a>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-bs-toggle="offcanvas"
        >
          <span className="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
  );
}

export default NavigationBar;
