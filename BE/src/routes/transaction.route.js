const express = require("express");
const transactionController = require("../controllers/transaction.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const userRole = require("../enums/userRole.enum")

router.get("/getAll", transactionController.getAll);
router.get("/getById/:id", transactionController.getById);
router.post("/add", authMiddleware.verifyRoles([userRole.PHARMACIST,userRole.CUSTOMER]), transactionController.add);
router.put("/update", authMiddleware.verifyRoles([userRole.PHARMACIST,userRole.CUSTOMER]), transactionController.update);

module.exports = router;