import { Router } from "express";
import { PhasesController } from "../controllers/phasesController.js";

const router = Router();

router.post("/phases", PhasesController);

export default router;
