import { uploadUserImgService } from "../services/UploadImgService.js";
import jwt from "jsonwebtoken";

export async function uploadUserImgController(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    if (!req.file) {
      return res.status(400).json({ message: "Nenhuma imagem enviada!" });
    }

    await uploadUserImgService(userId, req.file);

    return res.status(200).json({
      message: "Imagem do usuário atualizada com sucesso",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Erro ao atualizar a imagem do usuário!",
    });
  }
}
