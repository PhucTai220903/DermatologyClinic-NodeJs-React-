const _userService = require("../services/user.service");

// GET
exports.getAllByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await _userService.getAllByRole(role);
    res.json(users);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

exports.getProfile = (req, res) => {
  res.json({
    message: "Thông tin người dùng",
    user: req.user,
    token: req.cookies,
  });
};

exports.getDocstorByDate = async (req, res) => {
  try {
    const { date } = req.body;
    const dateToCheckDoctors = await _userService.getDocTorsByDate(date);
    res.status(200).json(dateToCheckDoctors);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

// POST
exports.getById = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Thiếu ID người dùng" });
    }

    const user = await _userService.getById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

exports.getCustomerByName = async (req, res) => {
  try {
    const customerToGet = await _userService.getCustomerByName(
      req.body.customer_name
    );
    res.status(200).json(customerToGet);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

// PUT
exports.update = async (req, res) => {
  try {
    const updatedUser = await _userService.update(req.params.id, req.body);
    if (!updatedUser)
      return res.status(404).json({ message: "Ko tìm thấy user" });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.delete = async (req, res) => {
  try {
    const deletedUser = await userService.delete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "Ko tìm thấy user" });
    res.json({ message: "Xóa user thành công" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
