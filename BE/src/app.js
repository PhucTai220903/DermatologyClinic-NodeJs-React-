const express = require("express");
const connectDB = require("./config/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const route = require("./imports/routes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Cookies
app.use(cookieParser());

// Routes
app.use("/api/users", route.userRoutes);
app.use("/api/auth", route.authRoutes);
app.use("/api/comestic", route.comesticRoutes);
app.use("/api/appointment", route.appointmentRoutes);
app.use("/api/medicine", route.medicineRoutes);
app.use("/api/medical_record", route.medical_recordRoutes);
app.use("/api/cart", route.cart);
app.use("/api/treatment", route.treatment);
app.use("/api/order",route.order);
app.use("/api/transaction",route.transaction);
app.use("/api/statistic",route.statistic);
app.use("/api/schedule",route.schedule);

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
