import jwt from "jsonwebtoken";
import { updateImgService } from "../services/updateImgService.js";

export async function updateImgController(req, res) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({ message: "Token inválido ou expirado" });
    }

    const userId = decoded.id;

    if (!req.file) {
      return res.status(400).json({ message: "Nenhuma imagem enviada!" });
    }

    const result = await updateImgService(userId, req.file);

    return res.status(200).json({
      message: "Imagem do usuário atualizada com sucesso",
      user: result,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || "Erro ao atualizar imagem",
    });
  }
}