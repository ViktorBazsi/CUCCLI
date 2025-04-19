import express from "express";
import personController from "../controllers/person.controller.js";
const router = express.Router();
router.get("/by-date/:dateId", personController.listByDateId);
router.get("/", personController.listAll);
export default router;