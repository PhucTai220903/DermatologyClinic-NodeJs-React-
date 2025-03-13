const _medicineService = require("../services/medicine.service");

exports.getAll = async (req, res) => {
    try {
        const medicine = await _medicineService.getAll();
        res.json(medicine);
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
}

exports.add = async (req, res) => {
    try {
        const medicineToAdd = await _medicineService.add(req.body);
        res.status(200).json({ message: medicineToAdd });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
}

exports.getById = async (req, res) => {
    try {
        const medicineToGet = await _medicineService.getById(req.params.id);
        res.status(200).json({ medicineToGet });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
}

exports.selectById = async (req, res) => {
    try {
        const medicineToGet = await _medicineService.getById(req.body.medicine_id);
        res.status(200).json({ medicineToGet });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
}

exports.update = async (req, res) => {
    try {
        const medicineToUpdate = await _medicineService.update(req.body);
        res.status(200).json({ message: medicineToUpdate });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
}

exports.delete = async (req, res) => {
    try {
        const medicineToDelete = await _medicineService.delete(req.body.id);
        res.status(200).json({ message: medicineToDelete });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
}