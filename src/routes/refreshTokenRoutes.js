import { Router } from "express";
import { refreshTokenController } from "../controllers/refreshTokenController.js";

const router = Router();

/**
 * @swagger
 * /api/refresh:
 *   post:
 *     summary: Gera um novo access token a partir do refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Novo token gerado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Refresh token inválido ou expirado
 */
router.post("/refresh", refreshTokenController);

export default router;
