const _cartService = require("../services/cart.service");

exports.getByCusomterId = async (req, res) => {
  try {
    const { id } = req.user;
    const cartToGet = await _cartService.getByCustomerId(id);
    res.status(200).json(cartToGet);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

exports.add = async (req, res) => {
  try {
    const { id } = req.user;
    const cartToAdd = await _cartService.add(id, req.body);
    res.status(201).json({ message: cartToAdd });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.user;
    const { comestic_id } = req.body;
    const cartToUpdate = await _cartService.update(id, comestic_id);
    res.status(200).json({ message: cartToUpdate });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.user;
    const cartToUpdate = await _cartService.delete(id, req.params.id);
    res.status(200).json({ message: cartToUpdate });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};
