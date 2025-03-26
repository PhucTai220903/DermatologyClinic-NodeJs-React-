const express = require("express");
const appointmentController = require("../controllers/appointment.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const userRole = require("../enums/userRole.enum");

router.get("/getAll", appointmentController.getAll);
router.get("/getById/:id", appointmentController.getById);
router.get("/getByStatus/:status", appointmentController.getByStatus);
router.post(
  "/addByCustomer",
  authMiddleware.verifyRoles(userRole.CUSTOMER),
  appointmentController.addByCustomer
);
router.post("/addByPharmacist", appointmentController.addByPharmacist);
router.put("/update/:id", appointmentController.update);
router.delete("/delete", appointmentController.delete);

module.exports = router;
