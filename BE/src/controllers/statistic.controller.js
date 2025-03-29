const _statisticService = require("../services/statistic.service");

exports.getByDate = async (req, res) => {
  try {
    const statistic = await _statisticService.getByDate();
    res.json(statistic);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

exports.getByWeek = async (req, res) => {
  try {
    const statisticToAdd = await _statisticService.getByWeek(req.body);
    res.status(200).json(statisticToAdd);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};
