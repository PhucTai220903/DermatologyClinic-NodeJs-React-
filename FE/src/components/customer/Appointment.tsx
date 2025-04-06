import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import UserAPI from "../../api/user.api";
import AppointmentAPI from "../../api/appointment.api";
import { showSuccessToast, showErrorToast } from "../../utils/toast.util";
import userApi from "../../api/user.api";

const AppointmentForm = () => {
  const { token } = useAuth();
  const [doctors, setDoctors] = useState<{ id: string; name: string }[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState<Date>();

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await UserAPI.getAllUsersByRole("doctor");

        if (Array.isArray(response.data)) {
          const formattedDoctors = response.data.map((doctor) => ({
            id: doctor._id,
            name: doctor.name,
          }));
          setDoctors(formattedDoctors);
        } else {
          console.error("Dữ liệu không phải là mảng:", response.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bác sĩ:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSelectDate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateToSelect = new Date(e.target.value);
    setDate(dateToSelect);

    const year = dateToSelect.getFullYear();
    const month = String(dateToSelect.getMonth() + 1).padStart(2, "0");
    const day = String(dateToSelect.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    const responseDoctors = await userApi.getDoctorsByDate(dateString);
    if (responseDoctors.status === 200) {
      const doctorData = responseDoctors.data.map((item: any) => ({
        id: item.doctor._id,
        name: item.doctor.name,
      }));
      setDoctors(doctorData);
    } else {
      showErrorToast(responseDoctors.data.message);
      setSelectedDoctor("");
      //setDate(undefined);
    }
  };

  const handleSelectDoctor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDoctor(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let entity = {
      doctor_id: selectedDoctor,
      date: date,
    };

    try {
      let response = await AppointmentAPI.createAppointment(entity);
      if (response.status === 200) {
        showSuccessToast(response.data.message || "Đặt lịch thành công!");
        setIsSubmitted(true);
      } else {
        showErrorToast(response.data.message || "Có lỗi xảy ra!");
      }
    } catch (error) {
      console.error("Lỗi khi đặt lịch:", error);
      showErrorToast("Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  return (
    <div className="container my-5">
      {token ? (
        <div className="p-4 rounded" style={{ backgroundColor: "#e6f8f1" }}>
          <h2 className="text-center fw-bold">Lên lịch hẹn</h2>
          <p className="text-center">
            Đặt lịch khám ngay với bác sĩ của OSKIN. Đội ngũ chăm sóc khách hàng
            sẽ liên hệ để xác nhận cuộc hẹn.
          </p>

          {isSubmitted ? (
            <h2 className="text-center text-success">
              Bạn đã đặt lịch thành công
            </h2>
          ) : (
            <form id="appointment-form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Ngày và giờ khám:</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  onChange={handleSelectDate}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Chọn bác sĩ khám:</label>
                <select
                  className="form-select"
                  value={selectedDoctor}
                  onChange={handleSelectDoctor}
                >
                  <option value="" disabled>
                    Chọn bác sĩ
                  </option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-warning fw-bold px-5">
                  ĐẶT LỊCH
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center text-center p-4 rounded shadow-sm mb-5">
          <h1 className="text-primary fw-bold">
            Bạn cần{" "}
            <Link to="/login" className="text-danger">
              ĐĂNG NHẬP
            </Link>{" "}
            để đặt lịch hẹn
          </h1>
        </div>
      )}
    </div>
  );
};

export default AppointmentForm;
