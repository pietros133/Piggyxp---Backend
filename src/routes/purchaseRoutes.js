import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import { purchaseWithCoins } from "../controllers/PurchaseController.js";

const purchaseRoutes = Router();

purchaseRoutes.post("/purchases/coins", authMiddleware, purchaseWithCoins);

export default purchaseRoutes;
