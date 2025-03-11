import React, { useState, useEffect } from "react";
import * as utils from "./Display";

function Sidebar() {
  const [activeTab, setActiveTab] = useState<string>("");
  const [data, setData] = useState<any>(null); // Lưu trữ dữ liệu từ API

  const handleTabClick = async (tabId: string) => {
    setActiveTab(tabId);

    let users = await utils.displayText(tabId);
    setData(users);
  };

  return (
    <>
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-category p-0">Người dùng</li>

          <li className="nav-item">
            <a
              className={`nav-link ${
                activeTab === "nav-doctor-tab" ? "bg-primary text-white" : ""
              }`}
              href="#"
              onClick={() => handleTabClick("nav-doctor-tab")}
            >
              <i className="menu-icon mdi mdi-floor-plan"></i>
              <span className="menu-title">Bác sĩ</span>
            </a>
          </li>

          <li className="nav-item">
            <a
              className={`nav-link ${
                activeTab === "nav-pharmacist-tab"
                  ? "bg-primary text-white"
                  : ""
              }`}
              href="#"
              onClick={() => handleTabClick("nav-pharmacist-tab")}
            >
              <i className="menu-icon mdi mdi-floor-plan"></i>
              <span className="menu-title">Dược sĩ</span>
            </a>
          </li>

          <li className="nav-item">
            <a
              className={`nav-link ${
                activeTab === "nav-customer-tab" ? "bg-primary text-white" : ""
              }`}
              href="#"
              onClick={() => handleTabClick("nav-customer-tab")}
            >
              <i className="menu-icon mdi mdi-floor-plan"></i>
              <span className="menu-title">Khách hàng</span>
            </a>
          </li>

          <li className="nav-item nav-category">Thuốc - Trị liệu - Mỹ phẩm</li>

          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="menu-icon mdi mdi-card-text-outline"></i>
              <span className="menu-title">Thuốc</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="menu-icon mdi mdi-card-text-outline"></i>
              <span className="menu-title">Trị liệu</span>
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="menu-icon mdi mdi-card-text-outline"></i>
              <span className="menu-title">Mỹ phẩm</span>
            </a>
          </li>
        </ul>
      </nav>

      <div>
        {activeTab === "nav-doctor-tab" && data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          utils.displayText(activeTab)
        )}
      </div>
    </>
  );
}

export default Sidebar;
