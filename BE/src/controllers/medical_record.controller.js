const _medical_recordService = require("../services/medical_record.service")

exports.getAll = async (req, res) => {
    try {
        const medical_records = await _medical_recordService.getAll();
        res.json(medical_records);
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
}

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;

        const medical_record = await _medical_recordService.getById(id);
        res.json(medical_record);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
};

exports.add = async (req, res) => {
    try {
        const medical_recordToAdd = await _medical_recordService.add(req.body);
        res.status(200).json({ message: medical_recordToAdd });
    } catch (err) {
        res.status(err.status).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const medical_recordToUpdate = await _medical_recordService.update(req.params.id, req.body);
        res.status(200).json({ message: medical_recordToUpdate });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const medical_recordToDelete = await _medical_recordService.delete(req.body.id);
        res.status(200).json({message: medical_recordToDelete});
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
};

COntinue wwith this