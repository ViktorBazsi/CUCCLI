import express from "express";
import performanceController from "../controllers/performance.controller.js";
import authOptional from "../middlewares/authOptional.middleware.js";

const router = express.Router();

router.get("/", authOptional.authOptional, performanceController.listArchived);
router.get("/:id", authOptional.authOptional, performanceController.getById);
router.get(
  "/average/:id",
  authOptional.authOptional,
  performanceController.getPerformanceWithAverage
);

export default router;
