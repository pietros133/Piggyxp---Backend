import { Router } from "express";
import { FinishPhaseController } from "../controllers/FinishPhaseController.js";

const router = Router();

router.put("/finish", FinishPhaseController);

export default router;
