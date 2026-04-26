import { Router } from "express";
import { updateMissionController } from "../controllers/updateMissionController.js";

const router = Router();

router.put("/update-mission", updateMissionController);

export default router;
