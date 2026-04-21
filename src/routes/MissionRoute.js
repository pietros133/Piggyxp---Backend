import { Router } from "express";
import { MissionController } from "../controllers/MissionController.js";

const router = Router();

router.post("/mission", MissionController);

export default router;
