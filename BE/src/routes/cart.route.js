const express = require("express");
const cartController = require("../controllers/cart.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const userRole = require("../enums/userRole.enum")

router.get("/get",authMiddleware.verifyRoles(userRole.CUSTOMER), cartController.getByCusomterId);
router.post("/add", authMiddleware.verifyRoles(userRole.CUSTOMER), cartController.add);
router.put("/update", authMiddleware.verifyRoles(userRole.CUSTOMER), cartController.update);
router.delete("/delete", authMiddleware.verifyRoles(userRole.CUSTOMER), cartController.delete);

module.exports = router;