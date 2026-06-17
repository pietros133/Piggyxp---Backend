import { deleteUserService } from "../services/deleteUserService.js";
import jwt from "jsonwebtoken";

export async function deleteUserController(req, res) {
  try {
    // Extrai token do header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1]; // Bearer <TOKEN>, o do login
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const loggedUserId = Number(decoded.userId);
    const userIdToDelete = Number(req.params.id);

    // só pode deletar a si mesmo
    if (loggedUserId !== userIdToDelete) {
      return res.status(403).json({ message: "Você não pode deletar este usuário" });
    }

    // Chamando o service
    const result = await deleteUserService(userIdToDelete);

    return res.status(200).json(result);

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}
