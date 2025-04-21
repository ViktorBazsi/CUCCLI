import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", userController.create);
router.get("/", userController.listAll);
router.get("/:id", userController.getById);
router.patch("/:id", userController.update);
router.patch("/:id/role", userController.updateRole);
router.delete("/:id", userController.remove);

export default router;
