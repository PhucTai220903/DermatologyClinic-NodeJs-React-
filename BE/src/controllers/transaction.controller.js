const _transactionService = require("../services/transaction.service");

exports.getAll = async (req, res) => {
    try {
        const transaction = await _transactionService.getAll();
        res.json(transaction);
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
}

exports.getById = async (req, res) => {
    try {
        const transactionToGet = await _transactionService.getById(req.params.id);
        res.status(200).json({ transactionToGet });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
}

exports.add = async (req, res) => {
    try {
        const id = req.user.role === UserRoleENUM.CUSTOMER ? req.user.id : req.body.customer_id;
        const transactionToAdd = await _transactionService.add(id, req.body);
        res.status(200).json({ message: transactionToAdd });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
}

exports.update = async (req, res) => {
    try {
        const transactionToUpdate = await _transactionService.update(req.body);
        res.status(200).json({ message: transactionToUpdate });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
}
