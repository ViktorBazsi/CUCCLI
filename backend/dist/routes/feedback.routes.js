import express from "express";
import feedbackController from "../controllers/feedback.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
var router = express.Router();
router.post("/:performanceId", authMiddleware.authenticate, feedbackController.create);
router.get("/", feedbackController.listall);
router.get("/:id", feedbackController.getById);
router["delete"]("/:id", authMiddleware.authenticate, feedbackController.destroy);
export default router;