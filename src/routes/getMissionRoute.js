import { Router } from "express";
import { getMissionController } from "../controllers/getMissionController.js";

const router = Router();

router.get("/getMission", getMissionController);

export default router;
