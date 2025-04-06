import { Link } from "react-router-dom";

const UnauthorizationForm = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center w-50 my-5 p-4 mx-auto"
      style={{
        minHeight: "50vh",
        backgroundColor: "#f8d7da",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1 className="text-danger fw-bold">Lỗi 403!!</h1>
      <h2 className="text-dark text-center">
        🚫 Opps! Bạn không có quyền truy cập vào trang này
      </h2>
      <img
        src="/src/assets/customer/authorization/401Error.webp"
        alt="401 Error"
        className="img-fluid mt-3"
        style={{ maxWidth: "400px", borderRadius: "8px" }}
      />
      <Link className="my-4" to="/">
        <button
          className="btn btn-lg fw-bold text-white"
          style={{
            backgroundColor: "#dc3545",
            padding: "12px 24px",
            borderRadius: "60px",
            transition: "0.3s",
          }}
        >
          Trở lại trang chủ
        </button>
      </Link>
    </div>
  );
};

export default UnauthorizationForm;
