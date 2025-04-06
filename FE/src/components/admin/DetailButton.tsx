import { useEffect, useState } from "react";
import { tabIdFromSidebar } from "./Sidebar";
import UserAPI from "../../api/user.api";
import ComesticAPI from "../../api/comestic.api";
import { showErrorToast, showSuccessToast } from "../../utils/toast.util";
import { setTabId } from "./Sidebar";

interface Row {
  header: string;
  accessor: string;
  render?: (value: any) => React.ReactNode;
}

interface DetailButtonProps {
  type: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  idItem: string;
}

const DetailButton: React.FC<DetailButtonProps> = ({
  onClose,
  title,
  idItem,
}) => {
  const [data, setData] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    if (tabIdFromSidebar === "nav-comestic-tab") {
      const response = await ComesticAPI.updateComestic(idItem, data);
      if (response.status === 200) {
        showSuccessToast(response.data.message);
        setTabId(tabIdFromSidebar);
      } else {
        showErrorToast(response);
      }
    }
    onClose();
  };

  const getRows = (): Row[] => {
    const commonRows = [
      { header: "Tên", accessor: "name" },
      { header: "Email", accessor: "email" },
      { header: "Tuổi", accessor: "age" },
      {
        header: "Trạng thái",
        accessor: "status",
        render: (value: string) =>
          value === "active" ? "Đang hoạt động" : "Không hoạt động",
      },
      { header: "Ngày đăng ký", accessor: "createdAt" },
      { header: "Cập nhật gần nhất", accessor: "updatedAt" },
    ];

    switch (tabIdFromSidebar) {
      case "nav-doctor-tab":
      case "nav-pharmacist-tab":
        return [
          ...commonRows,
          {
            header: "Giới tính",
            accessor: "gender",
            render: (value: string) =>
              value === "male" ? "Nam" : value === "female" ? "Nữ" : "Khác",
          },
        ];

      case "nav-customer-tab":
        return [
          ...commonRows,
          { header: "Giới tính", accessor: "gender" },
          {
            header: "Level",
            accessor: "membership.level",
            render: (value) => value || "Chưa có",
          },
          {
            header: "Tích điểm",
            accessor: "membership.points",
            render: (value) => value ?? 0,
          },
          {
            header: "Tiền tích lũy",
            accessor: "membership.total_spent",
            render: (value) => value ?? 0,
          },
        ];

      case "nav-comestic-tab":
        return [
          { header: "Tên sản phẩm", accessor: "name" },
          {
            header: "Giá",
            accessor: "price",
          },
          { header: "Danh mục", accessor: "category" },
          {
            header: "Số lượng",
            accessor: "quantity",
          },
        ];
      default:
        return [];
    }
  };

  const fetchData = async () => {
    try {
      const apiMap: Record<string, any> = {
        "nav-pharmacist-tab": UserAPI.getById,
        "nav-doctor-tab": UserAPI.getById,
        "nav-customer-tab": UserAPI.getById,
        "nav-comestic-tab": ComesticAPI.getComesticById,
      };

      const apiFunction = apiMap[tabIdFromSidebar];
      if (apiFunction) {
        const response = await apiFunction(idItem);
        setData(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [idItem]);

  const rows = getRows();

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
            <form>
              {rows.map((row, index) => (
                <div className="mb-3" key={index}>
                  <label htmlFor={row.accessor} className="form-label">
                    {row.header}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={row.accessor}
                    value={
                      row.accessor.includes("membership.")
                        ? data?.membership?.[row.accessor.split(".")[1]] || ""
                        : row.render
                        ? row.render(data?.[row.accessor])
                        : data?.[row.accessor] || ""
                    }
                    onChange={handleInputChange}
                    required
                  />
                </div>
              ))}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary me-2"
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

export default DetailButton;
