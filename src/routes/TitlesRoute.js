import { Router } from "express";import { PhasesController } from "../controllers/phasesController.js";
import { TitlesController } from "../controllers/titlesController.js";

const router = Router();

router.post("/titles", TitlesController);

export default router;
