function Sidebar() {
  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-category p-0">Người dùng</li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="collapse"
              href="#ui-basic"
              aria-expanded="false"
              aria-controls="ui-basic"
            >
              <i className="menu-icon mdi mdi-floor-plan"></i>
              <span className="menu-title">Bác sĩ</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="collapse"
              href="#ui-basic"
              aria-expanded="false"
              aria-controls="ui-basic"
            >
              <i className="menu-icon mdi mdi-floor-plan"></i>
              <span className="menu-title">Dược sĩ</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="collapse"
              href="#ui-basic"
              aria-expanded="false"
              aria-controls="ui-basic"
            >
              <i className="menu-icon mdi mdi-floor-plan"></i>
              <span className="menu-title">Khách hàng</span>
            </a>
          </li>
          <li className="nav-item nav-category">Thuốc - Trị liệu - Mỹ phẩm</li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="collapse"
              href="#form-elements"
              aria-expanded="false"
              aria-controls="form-elements"
            >
              <i className="menu-icon mdi mdi-card-text-outline"></i>
              <span className="menu-title">Thuốc</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="collapse"
              href="#form-elements"
              aria-expanded="false"
              aria-controls="form-elements"
            >
              <i className="menu-icon mdi mdi-card-text-outline"></i>
              <span className="menu-title">Trị liệu</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="collapse"
              href="#form-elements"
              aria-expanded="false"
              aria-controls="form-elements"
            >
              <i className="menu-icon mdi mdi-card-text-outline"></i>
              <span className="menu-title">Mỹ phẩm</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
