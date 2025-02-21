require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const _userRepository = require("../repositories/user.repository")
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

exports.register = async (req) =>
{
    const { name, password, age } = req.body;

        const existingUser = await User.findOne({ name });
        if (existingUser) return res.status(400).json({ message: "Tên đã tồn tại" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, password: hashedPassword, age, role: UserRoleENUM.CUSTOMER });
        await _userRepository.createUser(newUser);
}

exports.login = async (name, password) => {
    const user = await User.findOne({ name });
    if (!user) throw new Error("Tên người dùng không tồn tại");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Sai mật khẩu");

    return generateToken(user);
};
