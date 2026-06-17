import { Router } from "express";
import { selectMissionController } from "../controllers/SelectMissionController.js";

const router  = Router();

router.put("/select", selectMissionController);

export default router;  
