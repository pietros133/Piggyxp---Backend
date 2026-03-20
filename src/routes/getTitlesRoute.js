import { Router } from "express";
import { getTitlesController } from "../controllers/getTitlesController.js";

const router = Router();

router.get("/title", getTitlesController);

export default router;
