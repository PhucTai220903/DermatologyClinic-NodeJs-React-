const express = require("express");
const medicineController = require("../controllers/medicine.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/getAll", medicineController.getAll);
router.get("/getById/:id", medicineController.getById);
router.post("/add", authMiddleware.verifyAdmin, medicineController.add);
router.put("/update", authMiddleware.verifyAdmin, medicineController.update);
router.delete("/delete", authMiddleware.verifyAdmin, medicineController.delete);

module.exports = router;