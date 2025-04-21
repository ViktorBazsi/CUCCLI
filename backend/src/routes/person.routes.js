import express from "express";
import personController from "../controllers/person.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/by-date/:dateId", personController.listByDateId);
router.get("/", personController.listAll);

router.get("/:id", personController.getById);

// router.post("/", personController.create);
// router.patch("/:id", personController.update);
router.delete("/:id", personController.destroy);

router.post("/:id/availability", personController.addAvailability);
router.patch(
  "/availability/:availabilityId",
  personController.updateAvailability
);
router.delete(
  "/availability/:availabilityId",
  personController.removeAvailability
);

// ➕ kép feltöltéses create
router.post("/", upload.single("image"), personController.create);

// ✏️ kép feltöltéses update
router.patch("/:id", upload.single("image"), personController.update);

export default router;
