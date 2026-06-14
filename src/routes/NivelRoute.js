import { Router } from "express";
import { NivelController } from "../controllers/NivelController.js";

const router = Router();

router.put("/nivel", NivelController);

export default router;
