const _orderService = require("../services/order.service");

exports.getAll = async (req, res) => {
    try {
        const order = await _orderService.getAll();
        res.json(order);
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
}

//exports.getByCustomerId = async (req,res)

exports.add = async (req, res) => {
    try {
        const currentUser = req.user;
        const orderToAdd = await _orderService.add(currentUser, req.body);
        res.status(200).json({ message: orderToAdd });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
}

exports.getById = async (req, res) => {
    try {
        const orderToGet = await _orderService.getById(req.params.id);
        res.status(200).json({ orderToGet });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
}