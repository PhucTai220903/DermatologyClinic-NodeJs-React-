const express = require("express");
const comesticController = require("../controllers/comestic.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const userRole = require("../enums/userRole.enum")

// Products
router.get("/getAll", comesticController.getAll);
router.get("/getById/:id",comesticController.getById);
router.post("/add", comesticController.addComestic);
router.post("/search", comesticController.searchComestic);
router.post("/sort",comesticController.sortByPrice);
router.put("/update",authMiddleware.verifyRoles(userRole.ADMIN), comesticController.updateComestic);
router.delete("/delete",authMiddleware.verifyRoles(userRole.ADMIN), comesticController.deleteComestic);

// Reviews
router.post("/review",authMiddleware.verifyRoles(userRole.CUSTOMER), comesticController.addReview);
router.put("/review",authMiddleware.verifyRoles(userRole.CUSTOMER), comesticController.updateReview);
router.delete("/review",authMiddleware.verifyRoles(userRole.CUSTOMER), comesticController.deleteReview);

module.exports = router;