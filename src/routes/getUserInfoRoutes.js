import express from "express";
import { getUserInfoController } from "../controllers/GetUserInfoController.js";

const Router = express.Router();

/**
 * @swagger
 * /api/userInfo:
 *   get:
 *     summary: Retorna as informações do usuário logado
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informações do usuário retornadas com sucesso
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Pietro
 *               email: pietro@email.com
 *       401:
 *         description: Não autorizado
 */
Router.get("/userInfo", getUserInfoController);

export default Router;
