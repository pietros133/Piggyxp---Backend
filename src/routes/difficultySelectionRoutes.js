import { Router } from "express";
import { difficultySelectionController } from "../controllers/difficultySelectionController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * /api/difficulty:
 *   post:
 *     summary: Habilita a seleção de dificuldade do usuário
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dificuldade definida com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post("/difficulty", authMiddleware, difficultySelectionController);

export default router;
