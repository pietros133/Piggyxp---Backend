import express from "express";
import { homeController } from "../controllers/home.controller.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const Router = express.Router();

/**
 * @swagger
 * /api/home:
 *   get:
 *     summary: Retorna perfil, progresso e conquistas do usuário logado em uma única chamada
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informações retornadas com sucesso
 *       401:
 *         description: Não autorizado
 */
Router.get("/home", authMiddleware, homeController);

export default Router;
