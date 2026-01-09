import { uploadUserImgService } from "../services/UploadImgService.js";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinaryconfig.js";

export async function uploadUserImgController(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Nenhuma imagem enviada!" });
    }

    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
      {
        folder: "users",
        public_id: `user_${userId}`,
        overwrite: true,
      }
    );

    const updatedUser = await uploadUserImgService(userId, result.secure_url);

    return res.status(200).json({
      message: "Imagem do usuário atualizada com sucesso",
      user: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Erro ao atualizar a imagem do usuário!",
    });
  }
}
