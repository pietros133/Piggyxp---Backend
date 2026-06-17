import { Router } from "express";
import { getPhasesController } from "../controllers/getPhasesController.js";

const router = Router();

router.get("/phase", getPhasesController);

export default router;
