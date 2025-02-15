const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Chưa đăng nhập" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Lưu user vào request
        next();
    } catch (error) {
        res.status(403).json({ message: "Token không hợp lệ" });
    }
};
