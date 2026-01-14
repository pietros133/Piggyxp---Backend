import { Router } from "express";
import { refreshTokenController } from "../controllers/refreshTokenController.js";

const router = Router();

router.post("/refresh", refreshTokenController);

export default router;
