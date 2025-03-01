const express = require("express");
const orderController = require("../controllers/order.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const userRole = require("../enums/userRole.enum")

router.get("/getAll", orderController.getAll);
router.get("/getById/:id", orderController.getById);
router.post("/add", authMiddleware.verifyRoles(userRole.PHARMACIST,userRole.CUSTOMER), orderController.add);

module.exports = router;