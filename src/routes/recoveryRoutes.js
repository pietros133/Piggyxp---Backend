import express from "express";
import {
  sendRecoveryCodeController,
  resetPasswordController,
} from "../controllers/RecoveryPasswordController.js";

const router = express.Router();

/**
 * @swagger
 * /api/recovery:
 *   post:
 *     summary: Envia código de recuperação de senha para o email do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: pietro@email.com
 *     responses:
 *       200:
 *         description: Código de recuperação enviado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.post("/recovery", sendRecoveryCodeController);

/**
 * @swagger
 * /reset:
 *   post:
 *     summary: Redefine a senha do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 example: pietro@email.com
 *               code:
 *                 type: string
 *                 example: "829341"
 *               newPassword:
 *                 type: string
 *                 example: "novaSenha123"
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Código inválido ou expirado
 */
router.post("/reset", resetPasswordController);

export default router;
