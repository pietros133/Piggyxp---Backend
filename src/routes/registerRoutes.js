import express from "express";
import { registerController } from "../controllers/RegisterController.js";

const Router = express.Router();

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pietro Miranda
 *               email:
 *                 type: string
 *                 example: pietro@email.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Usuário já existe ou dados inválidos
 */
Router.post("/register", registerController);

export default Router;
