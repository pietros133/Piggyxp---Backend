import { UpdateMissionService } from "../services/UpdateMissionService.js";
import jwt from "jsonwebtoken"; 

export async function updateMissionController(req, res) {
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
    const userId = decoded.id;
    const { erro, acerts, streak, completePhase, completeUnit, login } = req.body;

    if(erro == null || acerts == null || streak == null || completePhase == null || completeUnit == null || login == null) {
      return res.status(400).json({message: "Todos os campos devem ser informados"});
    }

    const update = await UpdateMissionService(userId, erro, acerts, streak, completePhase, completeUnit, login);

    return res.status(200).json(update);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
}
