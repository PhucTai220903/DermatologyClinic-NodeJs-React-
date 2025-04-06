import { useEffect, useState } from "react";
import AppointmentApi from "../../api/appointment.api";
import UserAPI from "../../api/user.api";
import { showErrorToast, showSuccessToast } from "../../utils/toast.util";

interface Appointment {
  doctor_id: string;
  customer_id: string;
  date: string;
}

interface Doctor {
  _id: string;
  name: string;
}

const SetAppointment = () => {
  const [appointment, setAppointment] = useState<Appointment>({
    doctor_id: "",
    customer_id: "",
    date: "",
  });
  const [searchCustomerQuery, setSearchCustomerQuery] = useState("");
  const [searchCustomerResults, setSearchCustomerResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [customerSelected, setCustomerSelected] = useState<string>("");
  const [dateValue, setDateValue] = useState<string>("");
  const [doctorList, setDoctorList] = useState<Doctor[]>([]);

  useEffect(() => {
    if (!searchCustomerQuery.trim()) {
      setSearchCustomerResults([]);
      setShowDropdown(false);
      return;
    }

    // Nếu đã chọn khách hàng và query trùng khớp với tên khách hàng đã chọn
    if (customerSelected && searchCustomerQuery === customerSelected) {
      setShowDropdown(false);
      return;
    }

    const delaySearch = setTimeout(async () => {
      const response = await UserAPI.getCustomerByName(searchCustomerQuery);
      if (response.status === 200) {
        setSearchCustomerResults(response.data);
        setShowDropdown(response.data.length > 0);
      } else {
        setSearchCustomerResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchCustomerQuery, customerSelected]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await UserAPI.getAllUsersByRole("doctor");
      if (response.status === 200) {
        setDoctorList(response.data);
      }
    };
    fetchDoctors();
  }, []);

  const handleSelectDate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDateValue(selectedDate);
    setAppointment({
      ...appointment,
      date: selectedDate,
    });

    try {
      const responseDoctors = await UserAPI.getDoctorsByDate(selectedDate);
      if (responseDoctors.status === 200) {
        const doctorData = responseDoctors.data.map((item: any) => ({
          _id: item.doctor._id,
          name: item.doctor.name,
        }));
        setDoctorList(doctorData);
      } else {
        showErrorToast(responseDoctors.data.message);
        setAppointment((prev) => ({
          ...prev,
          doctor_id: "",
        }));
      }
    } catch (error) {
      showErrorToast("Không thể tải danh sách bác sĩ");
      setDoctorList([]);
    }
  };

  const returnCustomerResult = () => {
    return (
      <div
        className="dropdown-menu show mt-1 shadow-lg border-0 rounded-3 overflow-hidden position-absolute w-100"
        style={{ zIndex: 1000 }}
      >
        {searchCustomerResults.length === 0 ? (
          <div className="px-3 py-2 text-center text-muted">
            <small>Không tìm thấy khách hàng</small>
          </div>
        ) : (
          searchCustomerResults.map((customer) => (
            <div
              key={customer._id}
              className="dropdown-item py-2 px-3 border-bottom"
              onClick={() => handleSelectCustomer(customer)}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex flex-column">
                <span className="fw-semibold text-primary">
                  {customer.name}
                </span>
                <small className="text-muted d-flex align-items-center">
                  <i className="bi bi-envelope-fill me-1"></i>
                  {customer.email}
                </small>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  const handleSelectCustomer = (customer: any) => {
    setAppointment({
      ...appointment,
      customer_id: customer._id,
    });
    setCustomerSelected(customer.name);
    setSearchCustomerQuery(customer.name);
    setShowDropdown(false);
  };

  const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDoctorId = e.target.value;
    setAppointment({
      ...appointment,
      doctor_id: selectedDoctorId,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await AppointmentApi.addByPharmacist(appointment);
      if (response.status === 201) {
        showSuccessToast("Đặt lịch hẹn thành công");
        setAppointment({
          doctor_id: "",
          customer_id: "",
          date: "",
        });
        setDateValue("");
        setCustomerSelected("");
        setSearchCustomerQuery("");
      } else {
        showErrorToast(response.data.message || "Đặt lịch hẹn thất bại");
      }
    } catch (error) {
      showErrorToast("Đã xảy ra lỗi khi đặt lịch hẹn");
    }
  };

  return (
    <div className="container py-4">
      <div>
        <div>
          <div>
            <div>
              <h3 className="mb-0">Đặt lịch hẹn</h3>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-bold">Ngày hẹn</label>
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    value={dateValue}
                    onChange={handleSelectDate}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Bác sĩ</label>
                  <select
                    className="form-select form-select-lg"
                    value={appointment.doctor_id}
                    onChange={handleDoctorChange}
                    required
                  >
                    <option value="" disabled>
                      Chọn bác sĩ
                    </option>
                    {doctorList.map((doctor) => (
                      <option key={doctor._id} value={doctor._id}>
                        {doctor.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4 position-relative">
                  <label className="form-label fw-bold">Khách hàng</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Nhập tên khách hàng để tìm kiếm"
                      value={searchCustomerQuery}
                      onChange={(e) => setSearchCustomerQuery(e.target.value)}
                      onFocus={() => setShowDropdown(true)}
                      onBlur={() =>
                        setTimeout(() => setShowDropdown(false), 200)
                      }
                      required
                    />
                    {searchCustomerQuery && (
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => {
                          setSearchCustomerQuery("");
                          setCustomerSelected("");
                          setAppointment((prev) => ({
                            ...prev,
                            customer_id: "",
                          }));
                        }}
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    )}
                  </div>
                  {showDropdown && returnCustomerResult()}
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={
                      !appointment.customer_id ||
                      !appointment.doctor_id ||
                      !appointment.date
                    }
                  >
                    <i className="bi bi-calendar-check me-2"></i>
                    Xác nhận đặt lịch
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetAppointment;
