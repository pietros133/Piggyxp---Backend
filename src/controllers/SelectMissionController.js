import { selectMissionsService } from "../services/SelectMissionsService.js";
import jwt from "jsonwebtoken"; 

export async function selectMissionController(req, res) {
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
    const { id } = req.body;

    if(!id) {
        return res.status(400).json({
            message: "Informar o id é obrigatório"
        })
    }

    const select = await selectMissionsService(id);

    return res.status(200).json(select);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}
