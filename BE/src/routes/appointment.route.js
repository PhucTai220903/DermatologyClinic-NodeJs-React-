const express = require("express");
const appointmentController = require("../controllers/appointment.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/getAll", appointmentController.getAll);
router.get("/getById/:id",appointmentController.getById);
router.post("/add",authMiddleware.verifyAdmin, appointmentController.add)
router.put("/update/:id",authMiddleware.verifyAdmin, appointmentController.update);
router.delete("/delete/:id",authMiddleware.verifyAdmin, appointmentController.delete);

module.exports = router;