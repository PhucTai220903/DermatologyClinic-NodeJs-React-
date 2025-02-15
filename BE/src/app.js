const express = require("express");
const connectDB = require("./config/database");
const userRoutes = require("./routes/user.route");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Cookies
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
