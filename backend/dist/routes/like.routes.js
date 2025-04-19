import express from "express";
import likeController from "../controllers/like.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
var router = express.Router();

// POST /api/like/:performanceId => like / dislike toggle
router.post("/:performanceId", authMiddleware.authenticate, likeController.toggleLike);
export default router;