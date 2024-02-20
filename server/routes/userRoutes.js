import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserById,
  updateUser,
} from "../controllers/userControllers.js";
import { adminMiddleware, protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser)
router.post("/login", authUser);
router
  .route("/:id")
  .get(protect, adminMiddleware, getUserById)
  .put(protect, adminMiddleware, updateUser);

export default router;
