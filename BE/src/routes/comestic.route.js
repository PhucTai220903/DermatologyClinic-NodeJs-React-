const express = require("express");
const comesticController = require("../controllers/comestic.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/getAll", comesticController.getAll);
router.get("/getById/:id",comesticController.getById);
router.post("/add",authMiddleware.verifyAdmin, comesticController.add)
router.put("/update/:id",authMiddleware.verifyAdmin, comesticController.update);
router.delete("/delete/:id",authMiddleware.verifyAdmin, comesticController.delete);

module.exports = router;