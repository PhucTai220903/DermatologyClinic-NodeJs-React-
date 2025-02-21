require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const _repository = require("../repositories/sub.repository");
const bcrypt = require("bcryptjs");
const userRole = require("../enums/userRole.enum");

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, age: user.age,name:user.name, role: user.role},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
    );
};

// const verifyToken = (token) => {
//     return jwt.verify(token, process.env.JWT_SECRET);
// };

exports.register = async (newUserRequest) =>
{
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

    return generateToken(user);
};
