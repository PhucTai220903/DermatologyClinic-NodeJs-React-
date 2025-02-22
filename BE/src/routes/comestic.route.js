const express = require("express");
const comesticController = require("../controllers/comestic.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

// Products
router.get("/getAll", comesticController.getAll);
router.get("/getById/:id",comesticController.getById);
router.post("/add",authMiddleware.verifyAdmin, comesticController.addComestic)
router.put("/update",authMiddleware.verifyAdmin, comesticController.updateComestic);
router.delete("/delete",authMiddleware.verifyAdmin, comesticController.deleteComestic);

// Reviews
// router.post("/review", comesticController.addReview);
// router.put("/review", comesticController.updateReview);
// router.delete("/review", comesticController.deleteReview);

module.exports = router;