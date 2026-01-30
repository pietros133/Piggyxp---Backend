import express from "express";
import { getUserProgressController } from "../controllers/getUserProgressInfoController.js";

const Router = express.Router();

/**
 * @swagger
 * /api/progressInfo:
 *   get:
 *     summary: Retorna o progresso do usuário
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Progresso do usuário retornado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               level: 5
 *               xp: 1240
 *               coins: 320
 *       401:
 *         description: Não autorizado
 */
Router.get("/progressInfo", getUserProgressController);

export default Router;
