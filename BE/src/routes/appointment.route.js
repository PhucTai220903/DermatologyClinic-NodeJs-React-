const express = require("express");
const appointmentController = require("../controllers/appointment.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/getAll", appointmentController.getAll);
router.get("/getById/:id",appointmentController.getById);
router.post("/addByCustomer",authMiddleware.currentUser ,appointmentController.addByCustomer);
router.post("/addByPharmacist",appointmentController.addByPharmacist);
router.put("/update/",appointmentController.update);
router.delete("/delete",appointmentController.delete);

module.exports = router;