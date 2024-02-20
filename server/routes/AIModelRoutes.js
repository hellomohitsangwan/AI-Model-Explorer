import express from "express";
import {
  getAiModelById,
  getAiModels,
  deleteAiModel,
  createAiModel,
  getAiModelsOfAdmin,
} from "../controllers/AIModelController.js";
import { adminMiddleware, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAiModels)
  .post(protect, adminMiddleware, createAiModel);

router.route("/myaimodels").get(protect, getAiModelsOfAdmin);
router
  .route("/:id")
  .get(getAiModelById)
  .delete(protect, adminMiddleware, deleteAiModel)

export default router;
