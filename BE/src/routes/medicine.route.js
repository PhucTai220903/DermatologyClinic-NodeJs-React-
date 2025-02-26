const express = require("express");
const medicineController = require("../controllers/medicine.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const userRole = require("../enums/userRole.enum")

router.get("/getAll", medicineController.getAll);
router.get("/getById/:id", medicineController.getById);
router.post("/add", authMiddleware.verifyRoles(userRole.ADMIN), medicineController.add);
router.put("/update", authMiddleware.verifyRoles(userRole.ADMIN), medicineController.update);
router.delete("/delete", authMiddleware.verifyRoles(userRole.ADMIN), medicineController.delete);

module.exports = router;