const express = require("express");
const scheduleController = require("../controllers/schedule.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const userRole = require("../enums/userRole.enum");

router.get("/getDoctorsByDate", scheduleController.getDoctorsByDate);
router.get("/getByDoctorId/:id", scheduleController.getByDoctorId);
router.post(
  "/add",
  authMiddleware.verifyRoles(userRole.DOCTOR),
  scheduleController.add
);
router.put(
  "/update",
  authMiddleware.verifyRoles(userRole.DOCTOR),
  scheduleController.update
);

module.exports = router;
