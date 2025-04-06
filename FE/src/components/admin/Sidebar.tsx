import { useState, useEffect } from "react";
import * as services from "../../api/general.api";
import DataTable from "./DataTable";
import AddButton from "./AddButton";
import ScheduleAPI from "../../api/schedule.api";
import { useAuth } from "../../hooks/useAuth";
import Calendar from "../mutual/Calendar";
import Examination from "../doctor/Examination";
import Queue from "../mutual/AppointmentQueue";
import AppointmentPharmacist from "../mutual/AppointmentPharmacist";
import Statistics from "./Statistics";
import SetAppointment from "../pharmacist/SetAppointment";

export let tabIdFromSidebar = "";
let sidebarUpdateCallback: ((customerId?: string) => void) | null = null;

export const setTabId = (tabId: string, selectedCustomerId?: string) => {
  tabIdFromSidebar = tabId;
  if (sidebarUpdateCallback) {
    sidebarUpdateCallback(selectedCustomerId);
  }
};

interface SidebarProps {
  tabId?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ tabId }) => {
  const [activeTab, setActiveTab] = useState<string>(tabId || "");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  let { user } = useAuth();

  useEffect(() => {
    sidebarUpdateCallback = (selectedCustomerId?: string) => {
      setSelectedCustomerId(selectedCustomerId || "");

      setActiveTab(tabIdFromSidebar);
      handleTabClick(tabIdFromSidebar);
    };

    return () => {
      sidebarUpdateCallback = null;
    };
  }, []);

  const handleTabClick = async (tabId: string) => {
    // if (activeTab === tabId) return;
    setActiveTab(tabId);
    setLoading(true);
    setData(null);

    console.log(tabId);

    tabIdFromSidebar = tabId; // Để xài được bên Detail button

    try {
      if (tabId === "nav-schedule-tab") {
        getColumns();
      } else if (tabId === "nav-queue-tab") {
        getColumns();
      } else if (tabId === "nav-examination-tab") {
        getColumns();
      } else if (tabId === "nav-appointment-tab") {
        getColumns();
      } else if (tabId === "nav-set-appointment-tab") {
        getColumns();
      } else if (tabId === "nav-statistics-tab") {
        getColumns();
      } else {
        const entities = await services.selectTab(tabId);
        setData(entities);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const userColumns = [
    {
      header: "STT",
      accessor: "index",
      render: (_: any, item: any, index: number) => index + 1,
    },
    { header: "Họ tên", accessor: "name" },
    { header: "Email", accessor: "email" },
    {
      header: "Trạng thái",
      accessor: "status",
      render: (value: string) =>
        value === "active" ? "Đang hoạt động" : "Không hoạt động",
    },
  ];

  const comesticColumns = [
    {
      header: "STT",
      accessor: "index",
      render: (_: any, item: any, index: number) => index + 1,
    },
    { header: "Tên", accessor: "name" },
    { header: "Phân loại", accessor: "category" },
    { header: "Giá", accessor: "price" },
    { header: "Số lượng", accessor: "quantity" },
    {
      header: "Trạng thái",
      accessor: "isHidden",
      render: (value: boolean) =>
        value ? "Không hoạt động" : "Đang hoạt động",
    },
    { header: "Điểm trung bình", accessor: "averageRating" },
  ];

  const medicineColumns = [
    {
      header: "STT",
      accessor: "index",
      render: (_: any, item: any, index: number) => index + 1,
    },
    { header: "Tên", accessor: "name" },
    { header: "Giá", accessor: "price" },
    { header: "Số lượng", accessor: "quantity" },
  ];

  const treatmentColumns = [
    {
      header: "STT",
      accessor: "index",
      render: (_: any, item: any, index: number) => index + 1,
    },
    { header: "Tên", accessor: "name" },
    { header: "Giá", accessor: "price" },
  ];

  const actions = (item: any) => (
    <button className="btn btn-primary">Chi tiết</button>
  );

  const getColumns = () => {
    if (
      ["nav-doctor-tab", "nav-pharmacist-tab", "nav-customer-tab"].includes(
        activeTab
      )
    ) {
      return userColumns;
    } else if (activeTab === "nav-comestic-tab") {
      return comesticColumns;
    } else if (activeTab === "nav-medicine-tab") {
      return medicineColumns;
    } else if (activeTab === "nav-treatment-tab") {
      return treatmentColumns;
      // for doctor role
    }
  };

  let contentToRender: React.ReactNode;
  if (activeTab === "nav-schedule-tab") {
    contentToRender = <Calendar />;
  } else if (activeTab === "nav-examination-tab") {
    contentToRender = <Examination customerId={selectedCustomerId} />;
  } else if (activeTab === "nav-queue-tab") {
    contentToRender = <Queue />;
  } else if (activeTab === "nav-appointment-tab") {
    contentToRender = <AppointmentPharmacist />;
  } else if (activeTab === "nav-statistics-tab") {
    contentToRender = <Statistics />;
  } else if (activeTab === "nav-set-appointment-tab") {
    contentToRender = <SetAppointment />;
  }

  // return roles components
  const returnAdminSidebar = () => {
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
                <span className="menu-title">Dược sĩ</span>
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "nav-customer-tab"
                    ? "bg-primary text-white"
                    : ""
                }`}
                href="#"
                onClick={() => handleTabClick("nav-customer-tab")}
              >
                <span className="menu-title">Khách hàng</span>
              </a>
            </li>

            <li className="nav-item nav-category">
              Thuốc - Trị liệu - Mỹ phẩm
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "nav-medicine-tab"
                    ? "bg-primary text-white"
                    : ""
                }`}
                href="#"
                onClick={() => handleTabClick("nav-medicine-tab")}
              >
                <span className="menu-title">Thuốc</span>
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "nav-treatment-tab"
                    ? "bg-primary text-white"
                    : ""
                }`}
                href="#"
                onClick={() => handleTabClick("nav-treatment-tab")}
              >
                <span className="menu-title">Trị liệu</span>
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "nav-comestic-tab"
                    ? "bg-primary text-white"
                    : ""
                }`}
                href="#"
                onClick={() => handleTabClick("nav-comestic-tab")}
              >
                <span className="menu-title">Mỹ phẩm</span>
              </a>
            </li>
            <li className="nav-item nav-category">Quản lý hệ thống</li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "nav-statistics-tab"
                    ? "bg-primary text-white"
                    : ""
                }`}
                href="#"
                onClick={() => handleTabClick("nav-statistics-tab")}
              >
                <span className="menu-title">Thống kê</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="container p-3">
          <div className="col-lg-12">
            {activeTab !== "" ? (
              activeTab !== "nav-customer-tab" ? (
                <AddButton type={activeTab} handleTabClick={handleTabClick} />
              ) : null
            ) : (
              <h1>Vui lòng chọn tab để hiển thị</h1>
            )}
          </div>

          {activeTab === "nav-statistics-tab" ? (
            contentToRender
          ) : (
            <DataTable
              columns={getColumns() as any}
              data={data || []}
              loading={loading}
              actions={actions}
            />
          )}
        </div>
      </>
    );
  };

  const returnDoctorSidebar = () => {
    return (
      <>
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <ul className="nav">
            <li className="nav-item nav-category p-0">Hồ sơ</li>

            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "nav-examination-tab"
                    ? "bg-primary text-white"
                    : ""
                }`}
                href="#"
                onClick={() => handleTabClick("nav-examination-tab")}
              >
                <span className="menu-title">Khám bệnh</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "nav-queue-tab" ? "bg-primary text-white" : ""
                }`}
                href="#"
                onClick={() => handleTabClick("nav-queue-tab")}
              >
                <span className="menu-title">Hàng đợi</span>
              </a>
            </li>

            <li className="nav-item nav-category">Lịch làm việc</li>

            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "nav-schedule-tab"
                    ? "bg-primary text-white"
                    : ""
                }`}
                href="#"
                onClick={() => handleTabClick("nav-schedule-tab")}
              >
                <span className="menu-title">Xem lịch</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="container p-3">
          <div className="col-lg-12">
            {/*{activeTab !== "" ? (
              activeTab !== "nav-customer-tab" ? (
                <AddButton type={activeTab} handleTabClick={handleTabClick} />
              ) : null
            ) : (
              <h1>Vui lòng chọn tab để hiển thị</h1>
            )}*/}
          </div>

          {contentToRender}
        </div>
      </>
    );
  };

  const returnPharmacistSidebar = () => {
    return (
      <>
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <ul className="nav">
            <li className="nav-item nav-category p-0">Lịch hẹn</li>

            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "nav-appointment-tab"
                    ? "bg-primary text-white"
                    : ""
                }`}
                href="#"
                onClick={() => handleTabClick("nav-appointment-tab")}
              >
                <span className="menu-title">Cuộc hẹn</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "nav-set-appointment-tab"
                    ? "bg-primary text-white"
                    : ""
                }`}
                href="#"
                onClick={() => handleTabClick("nav-set-appointment-tab")}
              >
                <span className="menu-title">Đặt lịch hẹn</span>
              </a>
            </li>

            <li className="nav-item nav-category">Lịch làm việc</li>

            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "nav-medicine-tab"
                    ? "bg-primary text-white"
                    : ""
                }`}
                href="#"
                onClick={() => handleTabClick("nav-medicine-tab")}
              >
                <span className="menu-title">Xem lịch</span>
              </a>
            </li>

            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "nav-register-schedule-tab"
                    ? "bg-primary text-white"
                    : ""
                }`}
                href="#"
                onClick={() => handleTabClick("nav-register-schedule-tab")}
              >
                <span className="menu-title">Đăng ký lịch</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="container p-3">
          <div className="col-lg-12">
            {/*{activeTab !== "" ? (
              activeTab !== "nav-customer-tab" ? (
                <AddButton type={activeTab} handleTabClick={handleTabClick} />
              ) : null
            ) : (
              <h1>Vui lòng chọn tab để hiển thị</h1>
            )}*/}
          </div>

          {activeTab === "treatment" ||
          activeTab === "medicine" ||
          activeTab === "comestic" ? (
            <DataTable
              columns={getColumns() as any}
              data={data || []}
              loading={loading}
              actions={actions}
            />
          ) : (
            contentToRender
          )}
        </div>
      </>
    );
  };

  switch (user.role) {
    case "admin":
      return returnAdminSidebar();
    case "doctor":
      return returnDoctorSidebar();
    case "pharmacist":
      return returnPharmacistSidebar();
    default:
      break;
  }
};

export default Sidebar;
