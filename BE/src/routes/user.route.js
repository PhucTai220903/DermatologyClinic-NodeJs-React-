const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/getAllUsers", userController.getAllUsers);
router.get("/profile", authMiddleware.currentUser, userController.getProfile); 

router.post("/getUser", userController.getUserById);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
