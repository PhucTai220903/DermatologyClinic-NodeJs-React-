const _scheduleService = require("../services/schedule.service");

exports.getDoctorsByDate = async (req, res) => {
  try {
    const schedule = await _scheduleService.getDoctorsByDate();
    res.json(schedule);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

exports.getByDoctorId = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await _scheduleService.getByDoctorId(id);
    res.json(schedule);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

exports.add = async (req, res) => {
  try {
    const { id } = req.user;
    const dateToSchedule = req.body;
    const schedule = await _scheduleService.add(id, dateToSchedule);
    res.status(200).json({ message: schedule });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const scheduleToUpdate = await _scheduleService.update(req.body);
    res.status(200).json({ message: scheduleToUpdate });
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};
