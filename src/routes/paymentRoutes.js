import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import { createPaymentController } from "../controllers/PaymentController.js";

const paymentRoutes = Router();

paymentRoutes.post("/create", authMiddleware, createPaymentController);

export default paymentRoutes;
