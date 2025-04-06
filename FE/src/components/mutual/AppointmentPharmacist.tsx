import { useEffect, useState } from "react";
import AppointmentAPI from "../../api/appointment.api";
import { showErrorToast, showSuccessToast } from "../../utils/toast.util";
import userApi from "../../api/user.api";
import MedicalRecordAPI from "../../api/medical_record.api";

interface MedicalRecord {
  _id: string;
  customer_id: string;
  doctor_id: string;
  diagnosis: string;
  prescription: {
    item_id: string;
    type: string;
    dosage: string;
    frequency: string;
    duration: string;
    _id: string;
  }[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const AppointmentPharmacist = () => {
  const [data, setData] = useState<any[]>([]);
  const [userNames, setUserNames] = useState<{
    [key: string]: string;
  }>({});
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(
    null
  );

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await AppointmentAPI.getAll();
      setData(response.data);

      const uniqueUserIds = new Set([
        ...response.data.map((app: any) => app.customer_id),
        ...response.data.map((app: any) => app.doctor_id),
      ]);

      const namePromises = Array.from(uniqueUserIds).map(async (userId) => {
        try {
          const userResponse = await userApi.getById(userId);
          return { id: userId, name: userResponse.data.name };
        } catch (error) {
          console.error(`Lỗi khi lấy thông tin user ${userId}:`, error);
          return { id: userId, name: "Không xác định" };
        }
      });

      const userNames = await Promise.all(namePromises);
      const nameMap = userNames.reduce((acc, { id, name }) => {
        acc[id] = name;
        return acc;
      }, {} as { [key: string]: string });

      setUserNames(nameMap);
    } catch (error: any) {
      showErrorToast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "move_to_queue":
        return <span className="badge bg-primary">Đang chờ khám</span>;
      case "confirmed":
        return <span className="badge bg-success">Đã xác nhận</span>;
      case "canceled":
        return <span className="badge bg-danger">Đã hủy</span>;
      case "examined":
        return <span className="badge bg-warning text-dark">Khám xong</span>;
      case "completed":
        return <span className="badge bg-info text-dark">Hoàn tất</span>;
      default:
        return <span className="badge bg-secondary">Không xác định</span>;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleChangeStatus = async (
    appointmentId: string,
    newStatus: string
  ) => {
    try {
      const response = await AppointmentAPI.update(appointmentId, newStatus);
      if (response.status === 200) {
        showSuccessToast(response.data.message);
        fetchAppointments();
      }
    } catch (error: any) {
      showErrorToast(error.response.data.message);
    }
  };

  const handleSwitchStatus = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = event.target.value;
    setStatus(newStatus);

    let response = null;
    if (newStatus === "all") {
      response = await fetchAppointments();
    } else {
      response = await AppointmentAPI.getByStatus(newStatus);
    }

    setData(response.data);
  };

  const handleViewRecord = async (appointmentId: string) => {
    try {
      const response = await MedicalRecordAPI.getById(appointmentId);
      setSelectedRecord(response.data);
    } catch (error: any) {
      showErrorToast(error.response.data.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="mb-3">
        <label className="form-label">Chọn trạng thái</label>
        <select
          className="form-select"
          value={status}
          onChange={handleSwitchStatus}
        >
          <option value="all">Tất cả</option>
          <option value="confirmed" selected>
            Xác nhận
          </option>
          <option value="canceled">Hủy</option>
          <option value="move_to_queue">Chuyển qua bác sĩ</option>
          <option value="examined">Khám xong</option>
          <option value="completed">Hoàn tất</option>
        </select>
      </div>
      <h2 className="mb-4">Danh sách lịch hẹn</h2>
      <div className="row">
        {data.length > 0 ? (
          data.map((appointment) => (
            <div key={appointment._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title mb-0">
                      Lịch hẹn #{appointment._id.slice(-6)}
                    </h5>
                    {getStatusBadge(appointment.status)}
                  </div>
                  <div className="mb-3">
                    <p className="card-text mb-1">
                      <i className="bi bi-person me-2"></i>
                      Khách hàng:{" "}
                      {userNames[appointment.customer_id] || "Đang tải..."}
                    </p>
                    <p className="card-text mb-1">
                      <i className="bi bi-person-vcard me-2"></i>
                      Bác sĩ:{" "}
                      {userNames[appointment.doctor_id] || "Đang tải..."}
                    </p>
                    <p className="card-text mb-1">
                      <i className="bi bi-calendar me-2"></i>
                      Thời gian: {formatDateTime(appointment.date)}
                    </p>
                    <p className="card-text mb-1">
                      <i className="bi bi-clock-history me-2"></i>
                      Tạo lúc: {formatDateTime(appointment.createdAt)}
                    </p>
                  </div>
                </div>
                {appointment.status === "confirmed" && (
                  <div className="card-footer bg-transparent">
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          handleChangeStatus(appointment._id, "move_to_queue")
                        }
                      >
                        Chuyển qua bác sĩ
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          handleChangeStatus(appointment._id, "cancelled")
                        }
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                )}
                {appointment.status === "examined" && (
                  <div className="card-footer bg-transparent">
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() =>
                          handleViewRecord(appointment.medical_record_id)
                        }
                      >
                        Xem chi tiết
                      </button>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          handleChangeStatus(appointment._id, "completed")
                        }
                      >
                        Hoàn tất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-info m-3">Không có lịch hẹn nào</div>
        )}
      </div>

      {/* Modal hiển thị chi tiết */}
      {selectedRecord && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chi tiết hồ sơ bệnh</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedRecord(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <h6>Chẩn đoán:</h6>
                  <p>{selectedRecord.diagnosis}</p>
                </div>
                {selectedRecord.prescription &&
                  selectedRecord.prescription.length > 0 && (
                    <div className="mb-3">
                      <h6>Đơn thuốc:</h6>
                      <ul className="list-unstyled">
                        {selectedRecord.prescription.map((item, index) => (
                          <li key={index} className="mb-3">
                            <div className="card">
                              <div className="card-body">
                                <p>
                                  <strong>Loại:</strong> {item.type}
                                </p>
                                <p>
                                  <strong>Liều lượng:</strong> {item.dosage}
                                </p>
                                <p>
                                  <strong>Tần suất:</strong> {item.frequency}
                                </p>
                                <p>
                                  <strong>Thời gian:</strong> {item.duration}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                {selectedRecord.notes && (
                  <div className="mb-3">
                    <h6>Ghi chú:</h6>
                    <p>{selectedRecord.notes}</p>
                  </div>
                )}
                <div className="text-muted">
                  <small>
                    Ngày tạo: {formatDateTime(selectedRecord.createdAt)}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentPharmacist;
