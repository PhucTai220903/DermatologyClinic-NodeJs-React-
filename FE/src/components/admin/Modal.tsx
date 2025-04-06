import React, { useState } from "react";
import TreatmentAPI from "../../api/treatment.api";
import ComesticAPI from "../../api/comestic.api";
import { Treatment } from "../../models/treatment.model";
import { assignTypeSideBar } from "./AddButton";
import * as showNotification from "../../utils/toast.util";
import { Comestic } from "../../models/comestic.model";
import { Medicine } from "../../models/medicine.model";
import { User } from "../../models/user.model";
import UserAPI from "../../api/user.api";
import MedicineAPI from "../../api/medicine.api";

interface Row {
  header: string;
  accessor: string;
  type: "text" | "number" | "email" | "password";
}

interface ModalProps {
  rows: Row[];
  isOpen: boolean;
  onClose: () => void;
  title: string;
  typeModal: string;
  handleTabClick: (tabId: string) => void;
}

let Modal: React.FC<ModalProps> = ({
  rows = [],
  isOpen,
  onClose,
  title,
  typeModal,
  handleTabClick,
}) => {
  if (!isOpen) return null;
  let assignedTabId = "";

  const initialFormData = rows.reduce(
    (acc, row) => ({ ...acc, [row.accessor]: row.type === "number" ? 0 : "" }),
    {} as Record<string, string | number>
  );

  const [formData, setFormData] = useState(initialFormData);
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "number" ? Number(value) : value,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setFormData((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  if (typeModal === "comestic") {
    assignedTabId = "nav-comestic-tab";
  } else if (typeModal === "treatment") {
    assignedTabId = "nav-treatment-tab";
  } else if (typeModal === "medicine") {
    assignedTabId = "nav-medicine-tab";
  } else if (typeModal === "doctor") {
    assignedTabId = "nav-doctor-tab";
  } else if (typeModal === "pharmacist") {
    assignedTabId = "nav-pharmacist-tab";
  } else if (typeModal === "customer") {
    assignedTabId = "nav-customer-tab";
  }

  const handleSave = async () => {
    setError(null);

    typeModal = assignTypeSideBar;

    try {
      const dataToSend = {
        ...formData,
      };

      let response = "";

      if (typeModal === "comestic") {
        //dataToSend.category = category;
        if (dataToSend.image && typeof dataToSend.image === "string") {
          dataToSend.image =
            dataToSend.image.split("\\").pop() || dataToSend.image;
        }

        response = await ComesticAPI.addComestic(
          dataToSend as unknown as Comestic
        );
      } else if (typeModal === "treatment") {
        response = await TreatmentAPI.add(dataToSend as unknown as Treatment);
      } else if (typeModal === "medicine") {
        response = await MedicineAPI.add(dataToSend as unknown as Medicine);
      } else if (
        typeModal === "doctor" ||
        typeModal === "pharmacist" ||
        typeModal === "customer"
      ) {
        dataToSend.role = typeModal;
        dataToSend.gender = gender;
        response = await UserAPI.add(dataToSend as unknown as User);
      }

      showNotification.showSuccessToast(response);
    } catch (error) {
      showNotification.showErrorToast(error as string);
    } finally {
      onClose();
      handleTabClick(assignedTabId); // Gọi hàm từ Sidebar
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      tabIndex={-1}
      onClick={onClose}
    >
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form>
              {(() => {
                if (rows.length === 0) {
                  return <p>Không có dữ liệu để hiển thị</p>;
                }

                if (typeModal === "comestic") {
                  return (
                    <>
                      {rows.map((row, index) => (
                        <div className="mb-3" key={index}>
                          <label htmlFor={row.accessor} className="form-label">
                            {row.header}
                          </label>
                          {row.accessor === "category" ? (
                            <select
                              className="form-control"
                              id={row.accessor}
                              value={category}
                              onChange={handleCategoryChange}
                              required
                            >
                              <option value="" disabled>
                                Chọn phân loại
                              </option>
                              <option value="cleanser">Sữa rửa mặt</option>
                              <option value="makeup_remover">Tẩy trang</option>
                              <option value="mask">Mặt nạ</option>
                            </select>
                          ) : (
                            <input
                              type={row.type}
                              className="form-control"
                              id={row.accessor}
                              value={formData[row.accessor] || ""}
                              onChange={handleInputChange}
                              required
                            />
                          )}
                        </div>
                      ))}
                    </>
                  );
                } else if (
                  typeModal === "doctor" ||
                  typeModal === "pharmacist" ||
                  typeModal === "customer"
                ) {
                  return (
                    <>
                      {rows.map((row, index) => (
                        <div className="mb-3" key={index}>
                          <label htmlFor={row.accessor} className="form-label">
                            {row.header}
                          </label>
                          <input
                            type={row.type}
                            className="form-control"
                            id={row.accessor}
                            value={formData[row.accessor] || ""}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      ))}
                      <div className="mb-3">
                        <label htmlFor="gender" className="form-label">
                          Giới tính
                        </label>
                        <select
                          className="form-control"
                          id="gender"
                          value={gender}
                          onChange={handleGenderChange}
                          required
                        >
                          <option value="" disabled>
                            Chọn giới tính
                          </option>
                          <option value="male">Nam</option>
                          <option value="female">Nữ</option>
                          <option value="other">Khác</option>
                        </select>
                      </div>
                    </>
                  );
                }

                return rows.map((row, index) => (
                  <div className="mb-3" key={index}>
                    <label htmlFor={row.accessor} className="form-label">
                      {row.header}
                    </label>
                    <input
                      type={row.type}
                      className="form-control"
                      id={row.accessor}
                      value={formData[row.accessor] || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                ));
              })()}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Đóng
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
