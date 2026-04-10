import { RegenLivesService } from "../services/regenLivesService.js";
import jwt from "jsonwebtoken"; 

export async function RegenLivesController(req, res) {
  try {
    // Verificação jwt
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ 
        message: "Token não fornecido" 
      });
    }
    
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Controller do service
    const { id } = req.query;

    if(!id) {
        return res.status(400).json({
            message: "Informar o id é obrigatório"
        })
    }

    const regen = await RegenLivesService(id);

    return res.status(200).json(regen);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
}
