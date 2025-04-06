import { useEffect, useState } from "react";
import userApi from "../../api/user.api";
import medical_recordApi from "../../api/medical_record.api";
import { useAuth } from "../../hooks/useAuth";
import comesticApi from "../../api/comestic.api";
import medicineApi from "../../api/medicine.api";
import treatmentApi from "../../api/treatment.api";
import { Link } from "react-router-dom";

const Information = () => {
  const [userData, setUserData] = useState<any>(null);
  const [medical_recordData, setMedical_RecordData] = useState<any>(null);
  const [isOpenMedicalRecord, setIsOpenMedicalRecord] = useState(false);
  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null); // Dữ liệu bản ghi được chọn
  const [itemRecord, setItemRecord] = useState<
    { _id: string; type: string; itemName: string }[]
  >([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return; // Kiểm tra nếu user chưa load xong

    const fetchUserData = async () => {
      try {
        const response = await userApi.getById(user.id);
        setUserData(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    const fetchMedicalRecord = async () => {
      try {
        const response = await medical_recordApi.getMedical_recordByIdCustomer(
          user.id
        );
        setMedical_RecordData(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy lịch sử khám bệnh:", error);
      }
    };

    fetchUserData();
    fetchMedicalRecord();
  }, [user.id]); // Thêm user.id vào dependency array

  const handleOpenModalDetail = async (record: any) => {
    setSelectedRecord(record);
    setIsOpenModalDetail(true);

    if (!record.prescription || record.prescription.length === 0) {
      console.warn("Không có đơn thuốc trong bản ghi.");
      return;
    }

    // Lấy danh sách tất cả id_tiem từ prescription
    const itemIds = record.prescription.map((item: any) => item.item_id);
    const typeItemIds = record.prescription.map((item: any) => item.type);

    let itemData: { _id: string; type: string; itemName: string }[] = [];
    let index = 0;

    try {
      for (const item_id of itemIds) {
        let response;
        switch (typeItemIds[index]) {
          case "comestic":
            response = await comesticApi.getComesticById(item_id);
            break;

          case "medicine":
            response = await medicineApi.getById(item_id);
            break;

          case "treatment":
            response = await treatmentApi.getById(item_id);
            break;

          default:
            console.warn("Loại không xác định:", record.type);
            return;
        }

        if (response) {
          itemData.push({
            _id: response.data._id,
            type: typeItemIds[index],
            itemName: response.data.name,
          });

          index++;
        }
      }

      setItemRecord(itemData); // Gán mảng thay vì object đơn
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const handleCloseModal = () => {
    setIsOpenModalDetail(false);
    setSelectedRecord(null);
  };

  const handleExportPDF = async (id: string) => {
    try {
      const pdfBlob = await medical_recordApi.exportPDF(id);

      // Tạo URL từ blob
      const url = window.URL.createObjectURL(new Blob([pdfBlob]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `record_${id}.pdf`);
      document.body.appendChild(link);

      link.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Lỗi khi tải file PDF:", error);
    }
  };

  return (
    <div className="container m-5">
      {!isOpenMedicalRecord ? (
        <div className="d-flex justify-content-center">
          <div className="card shadow-lg p-4" style={{ maxWidth: "500px" }}>
            <h2 className="text-center">
              Xin chào,{" "}
              <span className="fw-bold text-danger">
                {userData ? userData.name : "Đang tải..."}
              </span>
            </h2>
            <hr />
            <div>
              <p>
                <strong>Email:</strong>{" "}
                {userData ? userData.email : "Đang tải..."}
              </p>
              <p>
                <strong>Tuổi:</strong> {userData ? userData.age : "Đang tải..."}
              </p>
              <p>
                <strong>Giới tính:</strong> {userData ? userData.gender : ""}
              </p>
            </div>
            <div className="text-center mt-3">
              <button
                onClick={() => setIsOpenMedicalRecord(true)}
                className="btn btn-lg fw-bold text-white"
                style={{
                  backgroundColor: "rgb(220, 53, 69)",
                  padding: "12px 24px",
                  borderRadius: "60px",
                }}
              >
                Xem lịch sử khám
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card p-4 shadow-lg m-5">
          <h2 className="text-center mb-3">📋 Lịch sử khám bệnh</h2>
          {medical_recordData?.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Chẩn đoán</th>
                  <th>Ngày khám</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {medical_recordData.map((record: any, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{record.diagnosis}</td>
                    <td>{new Date(record.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => handleOpenModalDetail(record)}
                      >
                        Chi tiết
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleExportPDF(record._id)}
                      >
                        Xuất bệnh án
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-muted">
              Không có lịch sử khám bệnh.
            </p>
          )}
          <div className="text-center mt-3">
            <button
              onClick={() => setIsOpenMedicalRecord(false)}
              className="btn btn-lg fw-bold text-white"
              style={{
                backgroundColor: "rgb(220, 53, 69)",
                padding: "12px 24px",
                borderRadius: "60px",
              }}
            >
              Quay lại
            </button>
          </div>
        </div>
      )}

      {/* MODAL CHI TIẾT */}
      {isOpenModalDetail && selectedRecord && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chi tiết lịch sử khám bệnh</h5>
                <button
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Chẩn đoán:</strong> {selectedRecord.diagnosis}
                </p>
                <p>
                  <strong>Ngày khám:</strong>{" "}
                  {new Date(selectedRecord.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Đơn thuốc:</strong>{" "}
                  {selectedRecord?.prescription?.length > 0 ? (
                    <ul>
                      {selectedRecord.prescription.map(
                        (item: any, index: number) => (
                          <li
                            key={index}
                            className={
                              index % 2 === 0
                                ? "bg-light p-2 rounded"
                                : "bg-secondary text-white p-2 rounded"
                            }
                          >
                            <strong>Tên: </strong>
                            <Link
                              to={
                                itemRecord[index]
                                  ? `/${itemRecord[index].type}/getById/${itemRecord[index]._id}`
                                  : ""
                              }
                            >
                              {itemRecord[index]
                                ? itemRecord[index].itemName
                                : ""}
                            </Link>

                            <p>
                              <strong>Phân loại: </strong>
                              {item.type}
                            </p>
                            <p>
                              <strong>Liều lượng:</strong> {item.dosage}
                            </p>
                            <p>
                              <strong>Tần suất: </strong>
                              {item.frequency}
                            </p>
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    "Không có đơn thuốc"
                  )}
                </p>
                <p>
                  <strong>Ghi chú:</strong> {selectedRecord.notes || "Không có"}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Information;
