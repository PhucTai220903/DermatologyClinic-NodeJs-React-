const express = require("express");
const medical_recordController = require("../controllers/medical_record.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/getAll", authMiddleware.verifyDoctor, medical_recordController.getAll);
router.get("/getById/:id", authMiddleware.verifyDoctor, medical_recordController.getById);
router.post("/add", authMiddleware.verifyDoctor, medical_recordController.add);
router.put("/update", authMiddleware.verifyDoctor, medical_recordController.update);
router.delete("/delete", authMiddleware.verifyDoctor, medical_recordController.delete);

module.exports = router;