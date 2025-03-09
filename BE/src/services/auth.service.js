require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const _repository = require("../repositories/sub.repository");
const bcrypt = require("bcryptjs");
const userRole = require("../enums/userRole.enum");
const session = require("express-session");
const _otpService = require("./otp.service");

exports.generateToken = (user) => {
    return jwt.sign(
        { id: user.id, name: user.name, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
    );
};

exports.register = async (newUserRequest) => {
    const existingUser = await User.findOne({ email: newUserRequest.email });
    if (existingUser) throw new Error("Email đã tồn tại");

    const hashedPassword = await bcrypt.hash(newUserRequest.password, 10);
    newUserRequest.password = hashedPassword;
    await _repository.userRepository.add(newUserRequest);
}

exports.login = async (name, password) => {
    const user = await User.findOne({ name });
    if (!user) throw new Error("Tên người dùng không tồn tại");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Sai mật khẩu");

    session.user = { id: user.id, name: user.name, role: user.role, email: user.email };

    const otp = await _otpService.generateOTP();
    //return "Đã gửi mãi OTP đến email của bạn. Vui lòng check email để xác thực";
    return otp;
    // return generateToken(user);
};
