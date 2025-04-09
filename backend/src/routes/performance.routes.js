import express from "express";
import performanceController from "../controllers/performance.controller.js";

const router = express.Router();

router.get("/", performanceController.listArchived);

export default router;
