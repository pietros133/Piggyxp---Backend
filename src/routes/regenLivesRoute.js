import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { RegenLivesController } from "../controllers/regenLivesController.js";
const router = Router();

router.put("/regen", authMiddleware, RegenLivesController);

export default router;
