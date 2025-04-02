const _comesticService = require("../services/comestic.service");
const _reviewService = require("../services/review.service");

// Products
exports.getAll = async (req, res) => {
  try {
    const comestics = await _comesticService.getAll();
    res.json(comestics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Thiếu ID mỹ phẩm" });
    const comestic = await _comesticService.getById(id);
    res.json(comestic);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server: ", error });
  }
};

exports.addComestic = async (req, res) => {
  try {
    const comesticToAdd = await _comesticService.add(req.body);
    res.status(201).json({ message: comesticToAdd });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateComestic = async (req, res) => {
  try {
    const updateComestic = await _comesticService.update(
      req.params.id,
      req.body
    );
    if (!updateComestic)
      return res.status(404).json({ message: "Không tồn tại mỹ phẩm này" });
    res.status(200).json({ message: updateComestic });
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

exports.deleteComestic = async (req, res) => {
  try {
    const deletedComestic = await _comesticService.delete(req.body.id);
    if (!deletedComestic)
      return res.status(404).json({ messgae: "Không tồn tại mỹ phẩm này" });
    res.json(deletedComestic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.searchByName = async (req, res) => {
  try {
    const comesticToSearch = await _comesticService.searchByName(req.body.name);
    res.json(comesticToSearch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.sortByPrice = async (req, res) => {
  try {
    const comesticsList = await _comesticService.sortByPrice(req.body.type); // 1 là ascen, -1 là descen
    res.json(comesticsList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Reviews
exports.addReview = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const addedReview = await _reviewService.add(currentUserId, req.body);
    res.status(200).json({ message: addedReview });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const reviewToUpdate = await _reviewService.update(currentUserId, req.body);
    res.json(reviewToUpdate);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    await _reviewService.delete(currentUserId, req.body);
    res.json({ message: "Đã xóa bình luận thành công" });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
