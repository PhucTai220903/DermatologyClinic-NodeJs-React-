const _treatmentService = require("../services/treatment.service");

// GET
exports.getAll = async (req, res) => {
  try {
    const treatment = await _treatmentService.getAll();
    res.json(treatment);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const treatmentToGet = await _treatmentService.getById(req.params.id);
    res.status(200).json(treatmentToGet);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

// POST
exports.add = async (req, res) => {
  try {
    const treatmentToAdd = await _treatmentService.add(req.body);
    res.status(200).json({ message: treatmentToAdd });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

exports.searchByName = async (req, res) => {
  try {
    const treatmentToSearch = await _treatmentService.searchByName(
      req.body.name
    );
    res.status(200).json(treatmentToSearch);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

exports.selectById = async (req, res) => {
  try {
    const treatmentToSelect = await _treatmentService.getById(
      req.body.treatment_id
    );
    res.status(200).json({ treatmentToSelect });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

// PUT
exports.update = async (req, res) => {
  try {
    const treatmentToUpdate = await _treatmentService.update(req.body);
    res.status(200).json({ message: treatmentToUpdate });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

// DELETE
exports.delete = async (req, res) => {
  try {
    const treatmentToDelete = await _treatmentService.delete(req.params.id);
    res.status(200).json({ message: treatmentToDelete });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};
