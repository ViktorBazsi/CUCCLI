import express from "express";
import dateController from "../controllers/date.controller.js";

const router = express.Router();

router.get("/", dateController.listAll);
router.get("/:id", dateController.getById);

export default router;
