import express from "express";
import {
  sendRecoveryCodeController,
  resetPasswordController,
} from "../controllers/RecoveryPasswordController.js";

const router = express.Router();

router.post("/recovery", sendRecoveryCodeController);

router.post("/reset", resetPasswordController);

export default router;
