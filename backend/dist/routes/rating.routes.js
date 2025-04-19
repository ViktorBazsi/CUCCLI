import express from "express";
import ratingController from "../controllers/rating.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
var router = express.Router();
router.post("/:performanceId", authMiddleware.authenticate, ratingController.create);
router.get("/", ratingController.listall);
router.get("/:id", ratingController.getById);
router["delete"]("/:id", authMiddleware.authenticate, ratingController.destroy);
export default router;