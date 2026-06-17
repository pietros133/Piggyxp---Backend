import { Router } from "express";
import { uploadUserImgController } from "../controllers/UploadUserImgController.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

/**
 * @swagger
 * /api/upload-user-img:
 *   post:
 *     summary: Faz upload da imagem de perfil do usuário
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Imagem enviada com sucesso
 *         content:
 *           application/json:
 *             example:
 *               message: Imagem enviada
 *               imageUrl: https://res.cloudinary.com/app/image/upload/v123/user.png
 *       401:
 *         description: Não autorizado
 */
router.post(
  "/upload-user-img",
  upload.single("image"),
  uploadUserImgController,
);

export default router;
