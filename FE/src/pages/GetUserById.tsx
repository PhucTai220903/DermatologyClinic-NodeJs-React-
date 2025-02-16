import { useState } from "react";

const GetUserById = () => {
  const [userId, setUserId] = useState(""); // Lưu ID nhập vào
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const fetchUser = () => {
    if (!userId) {
      setError("Vui lòng nhập ID!");
      return;
    }

    fetch("/api/users/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }), // ✅ Gửi ID qua body
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Không tìm thấy người dùng!");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setError("");
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div>
      <h2>Nhập ID người dùng</h2>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Nhập ID"
      />
      <button onClick={fetchUser}>Tìm kiếm</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {user && (
        <div>
          <h3>Thông tin người dùng</h3>
          <p>Tên: {user.name}</p>
          <p>Tuổi: {user.age}</p>
        </div>
      )}
    </div>
  );
};

export default GetUserById;
