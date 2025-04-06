import React, { useState } from "react";
import Modal from "./Modal";

interface AddButtonProps {
  type: string;
  handleTabClick: (tabId: string) => void;
}

export let assignTypeSideBar = "";

const AddButton: React.FC<AddButtonProps> = ({ type, handleTabClick }) => {
  let typeSideBar = (type: String) => {
    switch (type) {
      case "nav-customer-tab":
        return (assignTypeSideBar = "customer");
      case "nav-doctor-tab":
        return (assignTypeSideBar = "doctor");
      case "nav-pharmacist-tab":
        return (assignTypeSideBar = "pharmacist");
      case "nav-comestic-tab":
        return (assignTypeSideBar = "comestic");
      case "nav-medicine-tab":
        return (assignTypeSideBar = "medicine");
      case "nav-treatment-tab":
        return (assignTypeSideBar = "treatment");
      default:
        return "";
    }
  };

  const getRows = () => {
    switch (assignTypeSideBar) {
      case "pharmacist":
      case "doctor":
        return [
          { header: "Tên", accessor: "name", type: "text" },
          { header: "Email", accessor: "email", type: "email" },
          { header: "Mật khẩu", accessor: "password", type: "password" },
          { header: "Tuổi", accessor: "age", type: "number" },
        ];
      case "comestic":
      case "medicine":
        return [
          { header: "Tên", accessor: "name", type: "text" },
          { header: "Giá", accessor: "price", type: "number" },
          { header: "Số lượng hàng", accessor: "quantity", type: "number" },
          { header: "Hình ảnh", accessor: "image", type: "file" },
          { header: "Phân loại", accessor: "category", type: "select" },
        ];
      case "treatment":
        return [
          { header: "Tên", accessor: "name", type: "text" },
          { header: "Giá", accessor: "price", type: "number" },
        ];
      default:
        return [];
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary mb-3"
        onClick={handleOpenModal}
      >
        Thêm
      </button>

      <Modal
        rows={getRows() as any}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Thêm mới"
        typeModal={typeSideBar(type)}
        handleTabClick={handleTabClick}
      />
    </>
  );
};

export default AddButton;
