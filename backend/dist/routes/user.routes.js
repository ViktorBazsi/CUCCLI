import express from "express";
import userController from "../controllers/user.controller.js";
const router = express.Router();
router.post("/", userController.create);
router.get("/", userController.listAll);
export default router;