const express = require("express");
const treatmentController = require("../controllers/treatment.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const userRole = require("../enums/userRole.enum");

router.get("/getAll", treatmentController.getAll);
router.get("/getById/:id", treatmentController.getById);
router.post(
  "/add",
  authMiddleware.verifyRoles(userRole.ADMIN),
  treatmentController.add
);
router.post("/selectById", treatmentController.selectById);
router.post("/searchByName", treatmentController.searchByName);
router.put(
  "/update",
  authMiddleware.verifyRoles(userRole.ADMIN),
  treatmentController.update
);
router.delete(
  "/delete/:id",
  authMiddleware.verifyRoles(userRole.ADMIN),
  treatmentController.delete
);

module.exports = router;
