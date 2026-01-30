import express from "express";
import { updateUserController } from "../controllers/updateUserController.js";

const Router = express.Router();

/**
 * @swagger
 * /api/updateUser/{id}:
 *   put:
 *     summary: Atualiza os dados do usuário
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Novo Nome
 *               email:
 *                 type: string
 *                 example: novo@email.com
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       401:
 *         description: Não autorizado
 */
Router.put("/updateUser/:id", updateUserController);

export default Router;
