# Hệ Thống Quản Lý Phòng Khám Da Liễu

## Giới Thiệu

Hệ thống quản lý phòng khám da liễu là một ứng dụng web toàn diện được phát triển để quản lý và vận hành phòng khám da liễu một cách hiệu quả. Hệ thống bao gồm các chức năng quản lý bệnh nhân, lịch hẹn, hồ sơ bệnh án, đơn thuốc, và các hoạt động khác liên quan đến việc điều trị da liễu.

## Công Nghệ Sử Dụng

### Backend (Node.js)

- **Express.js**: Framework web server
- **MongoDB**: Cơ sở dữ liệu NoSQL
- **JWT**: Xác thực và phân quyền
- **Express-session**: Quản lý phiên đăng nhập
- **CORS**: Xử lý cross-origin requests
- **Body-parser**: Xử lý dữ liệu request
- **Cookie-parser**: Quản lý cookies
- **Speakeasy**: Xử lý OTP

### Frontend (React + Vite + TypeScript)

- **React**: Thư viện JavaScript cho giao diện người dùng
- **Vite**: Build tool và development server
- **TypeScript**: Ngôn ngữ lập trình typed
- **React Router**: Quản lý routing
- **Axios**: Xử lý HTTP requests
- **Material-UI/Bootstrap 5**: Styling và UI components

## Chức Năng Chính

### Quản Lý Người Dùng

- Đăng ký và đăng nhập
- Phân quyền người dùng (Admin, Bác sĩ, Dược sĩ, Bệnh nhân)
- Quản lý thông tin cá nhân

### Quản Lý Lịch Hẹn

- Đặt lịch hẹn khám
- Xem lịch làm việc của bác sĩ
- Nhắc lịch hẹn

### Quản Lý Bệnh Án

- Tạo và cập nhật hồ sơ bệnh án
- Lưu trữ hình ảnh và kết quả xét nghiệm
- Theo dõi tiến trình điều trị

### Quản Lý Thuốc và Mỹ Phẩm

- Quản lý kho thuốc
- Quản lý sản phẩm mỹ phẩm
- Tạo đơn thuốc

### Quản Lý Bán Hàng Mỹ Phẩm

- Quản lý danh mục sản phẩm mỹ phẩm
- Quản lý kho hàng và tồn kho
- Đặt hàng và quản lý đơn hàng
- Giỏ hàng và thanh toán
- Quản lý khuyến mãi và giảm giá
- Theo dõi doanh số bán hàng
- Đánh giá và review sản phẩm

### Quản Lý Điều Trị

- Lập kế hoạch điều trị
- Theo dõi quá trình điều trị
- Đánh giá kết quả điều trị

### Quản Lý Tài Chính

- Quản lý hóa đơn
- Theo dõi doanh thu
- Thống kê tài chính

### Báo Cáo và Thống Kê

- Báo cáo doanh thu
- Thống kê bệnh nhân
- Phân tích hiệu quả điều trị

## Cài Đặt và Chạy

### Backend

```bash
# Cài đặt dependencies
npm install

# Chạy server
npm start
```

### Frontend

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

## Môi Trường Phát Triển

- Node.js >= 14.x
- MongoDB >= 4.x
- React >= 18.x
- TypeScript >= 4.x

## Cấu Hình Môi Trường

Tạo file `.env` với các biến môi trường sau:

```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## Đóng Góp

Mọi đóng góp cho dự án đều được hoan nghênh. Vui lòng tạo pull request với mô tả chi tiết về thay đổi.

## Giấy Phép

Dự án được phát triển bởi Nhóm 2.
