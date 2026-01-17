import { Router } from "express";
import { difficultySelectionController } from "../controllers/difficultySelectionController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/difficulty", authMiddleware, difficultySelectionController);

export default router;
