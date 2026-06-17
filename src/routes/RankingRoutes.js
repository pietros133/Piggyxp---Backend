import { Router } from "express";
import { RankServiceController } from "../controllers/RankingController.js";

const router  = Router();

router.get("/ranking", RankServiceController);

export default router;  
