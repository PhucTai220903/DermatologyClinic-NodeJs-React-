const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/getAll", userController.getAll);
router.get("/profile", authMiddleware.currentUser, userController.getProfile); 

router.post("/getById", userController.getById);
router.put("/update/:id", userController.update);
router.delete("/delete", userController.delete);

module.exports = router;
