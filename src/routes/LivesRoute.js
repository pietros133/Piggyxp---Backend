import { Router } from "express";
import { LivesController } from "../controllers/LivesController.js";

const router = Router();

router.put("/live", LivesController);

export default router;
