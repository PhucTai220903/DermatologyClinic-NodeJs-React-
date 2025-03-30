const express = require("express");
const medical_recordController = require("../controllers/medical_record.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const userRole = require("../enums/userRole.enum");

router.get(
  "/getAll",
  authMiddleware.verifyRoles([userRole.DOCTOR, userRole.PHARMACIST]),
  medical_recordController.getAll
);
router.get(
  "/getById/:id",
  authMiddleware.verifyRoles([userRole.DOCTOR, userRole.PHARMACIST]),
  medical_recordController.getById
);
router.post("/getByCustomerId", medical_recordController.getByCustomerId);
router.post(
  "/add",
  authMiddleware.verifyRoles(userRole.DOCTOR),
  medical_recordController.add
);
router.post("/export_record", medical_recordController.export_record);
router.put(
  "/update",
  authMiddleware.verifyRoles(userRole.DOCTOR),
  medical_recordController.update
);

module.exports = router;
