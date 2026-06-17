import { Router } from "express";
import { RegenLivesController } from "../controllers/regenLivesController.js";
const router = Router();

router.put("/regen", RegenLivesController);

export default router;
