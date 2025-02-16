const _userService = require("../services/user.service");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await _userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
      const { id } = req.body; 
      if (!id) {
        return res.status(400).json({ message: "Thiếu ID người dùng" });
      }
      
      const user = await _userService.getUserById(id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  };

exports.createUser = async (req, res) => {
    try {
        const newUser = await _userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await _userService.updateUser(req.params.id, req.body);
        if (!updatedUser) return res.status(404).json({ message: "Ko tìm thấy user" });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await userService.deleteUser(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "Ko tìm thấy user" });
        res.json({ message: "Xóa user thành công" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProfile = (req, res) => {
    res.json({
        message: "Thông tin người dùng",
        user: req.user, 
        token: req.cookies
    });
};

