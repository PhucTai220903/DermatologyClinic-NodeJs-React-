const express = require("express");
const statisticController = require("../controllers/statistic.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const userRole = require("../enums/userRole.enum")

router.post("/getByDate", statisticController.getByDate);
router.post("/getByWeek", statisticController.getByWeek);

module.exports = router;