import { updateUserService } from "../services/updateUserService.js";
import jwt from "jsonwebtoken";

export async function updateUserController(req, res) {

    try {
    
    // Extrai token do header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido" });
    }
    
    const token = authHeader.split(" ")[1]; // Bearer <TOKEN>, o do login
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const loggedUserId = Number(decoded.userId);
    const userIdToUpdate = Number(req.params.id);
    
    // só pode deletar a si mesmo
    if (loggedUserId !== userIdToUpdate) {
      return res.status(403).json({ message: "Você não pode atualizar este usuário" });
    }
    

    const { id } = req.params;
    const { name, email } = req.body;

    // Validação básica
    if (!id) {
      return res.status(400).json({ message: "ID do usuário é obrigatório" });
    }

    if (!name && !email) {
      return res
      .status(400)
      .json({
        message: "Informe ao menos um campo para atualização",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      return res.status(400).json({ message: "Email inválido!" });
    }

    const updatedUser = await updateUserService(id, { name, email });

    return res.status(200).json({
      message: "Usuário atualizado com sucesso",
      user: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
       message: err.message || "Erro ao atualizar usuário!",
    });
  }
}