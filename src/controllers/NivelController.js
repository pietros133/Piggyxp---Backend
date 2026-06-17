import { NivelService } from "../services/NivelService.js";
import jwt from "jsonwebtoken";

export async function NivelController(req, res) {
  try {
    // Verificação jwt
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token não fornecido",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Controller do service
    const id = decoded.userId;
    const nivel = await NivelService(id);

    return res.status(200).json(nivel);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
}
