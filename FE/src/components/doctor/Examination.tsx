import React, { useState, useEffect } from "react";
import ComesticApi from "../../api/comestic.api";
import customerApi from "../../api/user.api";
import MedicalRecordAPI from "../../api/medical_record.api";
import { showErrorToast, showSuccessToast } from "../../utils/toast.util";
import { useAuth } from "../../hooks/useAuth";
import MedicineApi from "../../api/medicine.api";
import TreatmentApi from "../../api/treatment.api";
import { appointmentIdFromQueue } from "../mutual/AppointmentQueue";
import AppointmentApi from "../../api/appointment.api";

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
  _id: string;
  name: string;
  image: string;
}

// Định nghĩa kiểu dữ liệu cho đơn thuốc
interface Prescription {
  id: number;
  searchQuery: string;
  selectedProduct: string;
  searchResults: Product[];
  category: string;
  dosage: string;
  frequency: string;
}

interface PrescriptionItem {
  item_id: string;
  type: string;
  product_name: string;
  dosage: string;
  frequency: string;
  duration: string;
  searchQuery: string;
  searchResults: Product[];
}

interface FormData {
  customer_id: string;
  doctor_id: string;
  diagnosis: string;
  prescription: PrescriptionItem[];
  notes?: string;
}

interface ExaminationProps {
  customerId?: string;
  appointmentId?: string;
}

const Examination: React.FC<ExaminationProps> = ({
  customerId,
  appointmentId,
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    customer_id: customerId || "",
    doctor_id: user?._id || "",
    diagnosis: "",
    prescription: [],
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<string>("");

  const addPrescription = () => {
    setFormData((prev) => ({
      ...prev,
      prescription: [
        ...prev.prescription,
        {
          item_id: "",
          type: "",
          product_name: "",
          dosage: "",
          frequency: "",
          duration: "",
          searchQuery: "",
          searchResults: [],
        },
      ],
    }));
  };

  const removePrescription = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      prescription: prev.prescription.filter((_, i) => i !== index),
    }));
  };

  const handleSearchChange = async (
    index: number,
    type: string,
    query: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      prescription: prev.prescription.map((item, i) =>
        i === index ? { ...item, searchQuery: query, searchResults: [] } : item
      ),
    }));

    if (!query.trim()) return;

    try {
      let response;
      switch (type) {
        case "medicine":
          response = await MedicineApi.searchByName(query);
          break;
        case "comestic":
          response = await ComesticApi.searchByName(query);
          break;
        case "treatment":
          response = await TreatmentApi.searchByName(query);
          break;
        default:
          return;
      }

      setFormData((prev) => ({
        ...prev,
        prescription: prev.prescription.map((item, i) =>
          i === index ? { ...item, searchResults: response?.data || [] } : item
        ),
      }));
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
      setFormData((prev) => ({
        ...prev,
        prescription: prev.prescription.map((item, i) =>
          i === index ? { ...item, searchResults: [] } : item
        ),
      }));
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrescriptionChange = (
    index: number,
    field: keyof PrescriptionItem,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      prescription: prev.prescription.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleProductSelect = (index: number, product: Product) => {
    setFormData((prev) => ({
      ...prev,
      prescription: prev.prescription.map((item, i) =>
        i === index
          ? {
              ...item,
              item_id: product._id,
              product_name: product.name,
              searchQuery: "",
              searchResults: [],
            }
          : item
      ),
    }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!customerId) return;
      try {
        const response = await customerApi.getById(customerId);
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
        showErrorToast("Không thể lấy thông tin khách hàng");
      }
    };

    fetchUserData();
  }, [customerId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.diagnosis.trim()) {
      showErrorToast("Vui lòng nhập chẩn đoán");
      return;
    }
    if (formData.prescription.length === 0) {
      showErrorToast("Vui lòng thêm ít nhất một đơn thuốc");
      return;
    }

    setLoading(true);
    try {
      const response = await MedicalRecordAPI.add(
        formData,
        appointmentIdFromQueue
      );
      if (response.status === 201) {
        showSuccessToast("Tạo hồ sơ khám bệnh thành công");
        setFormData({
          customer_id: customerId || "",
          doctor_id: user?._id || "",
          diagnosis: "",
          prescription: [],
          notes: "",
        });
      }
      // Update appointment status to completed
      await AppointmentApi.update(appointmentIdFromQueue, "examined");
    } catch (error: any) {
      showErrorToast(error.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Khám bệnh</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Khách hàng</label>
                  <input
                    type="text"
                    className="form-control"
                    value={userName}
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Chẩn đoán</label>
                  <textarea
                    className="form-control"
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleInputChange}
                    rows={3}
                    required
                    placeholder="Nhập chẩn đoán bệnh..."
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Đơn thuốc</label>
                  {formData.prescription.map((item, index) => (
                    <div key={index} className="card mb-3">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-2">
                            <label className="form-label">Loại</label>
                            <select
                              className="form-control"
                              value={item.type}
                              onChange={(e) =>
                                handlePrescriptionChange(
                                  index,
                                  "type",
                                  e.target.value
                                )
                              }
                              required
                            >
                              <option value="">Chọn loại</option>
                              <option value="medicine">Thuốc</option>
                              <option value="comestic">Mỹ phẩm</option>
                              <option value="treatment">Trị liệu</option>
                            </select>
                          </div>
                          <div className="col-md-2">
                            <label className="form-label">Sản phẩm</label>
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control"
                                value={item.searchQuery || item.product_name}
                                onChange={(e) =>
                                  handleSearchChange(
                                    index,
                                    item.type,
                                    e.target.value
                                  )
                                }
                                placeholder="Tìm kiếm sản phẩm..."
                                required
                              />
                              {item.searchResults.length > 0 && (
                                <ul
                                  className="list-group position-absolute w-100 mt-1 shadow"
                                  style={{ zIndex: 1000 }}
                                >
                                  {item.searchResults.map((product) => (
                                    <li
                                      key={product._id}
                                      className="list-group-item d-flex justify-content-between align-items-center"
                                      onClick={() =>
                                        handleProductSelect(index, product)
                                      }
                                      style={{ cursor: "pointer" }}
                                    >
                                      <div className="d-flex align-items-center">
                                        <img
                                          src={product.image}
                                          alt={product.name}
                                          className="rounded-circle me-2"
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                          }}
                                        />
                                        {product.name}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                          <div className="col-md-2">
                            <label className="form-label">Liều lượng</label>
                            <input
                              type="text"
                              className="form-control"
                              value={item.dosage}
                              onChange={(e) =>
                                handlePrescriptionChange(
                                  index,
                                  "dosage",
                                  e.target.value
                                )
                              }
                              required
                              placeholder="Ví dụ: 1 viên"
                            />
                          </div>
                          <div className="col-md-2">
                            <label className="form-label">Tần suất</label>
                            <input
                              type="text"
                              className="form-control"
                              value={item.frequency}
                              onChange={(e) =>
                                handlePrescriptionChange(
                                  index,
                                  "frequency",
                                  e.target.value
                                )
                              }
                              required
                              placeholder="Ví dụ: 2 lần/ngày"
                            />
                          </div>
                          <div className="col-md-2">
                            <label className="form-label">Thời gian</label>
                            <input
                              type="text"
                              className="form-control"
                              value={item.duration}
                              onChange={(e) =>
                                handlePrescriptionChange(
                                  index,
                                  "duration",
                                  e.target.value
                                )
                              }
                              required
                              placeholder="Ví dụ: 7 ngày"
                            />
                          </div>
                          <div className="col-md-2 d-flex align-items-end">
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => removePrescription(index)}
                            >
                              Xóa
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={addPrescription}
                  >
                    + Thêm đơn thuốc
                  </button>
                </div>

                <div className="mb-3">
                  <label className="form-label">Ghi chú</label>
                  <textarea
                    className="form-control"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Nhập ghi chú nếu có..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  Lưu hồ sơ
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examination;
