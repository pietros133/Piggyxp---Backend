import { FinishPhaseService } from "../services/FinishPhaseService.js";
import jwt from "jsonwebtoken"; 

export async function FinishPhaseController(req, res) {
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
    const { difficulty, order, unit, id } = req.query;
    const { erro } = req.body;

    if (!difficulty || !order || !unit) {
      return res.status(400).json({
        message: "unit, difficulty e order são obrigatórios",
      });
    }

    if(!id) {
        return res.status(400).json({
            message: "Informar o id é obrigatório"
        })
    }

    if(!erro){
        return res.status(400).json({
            message: "informe a quantidade de erros."
        })
    }

    const finish = await FinishPhaseService(difficulty, order, unit, id, erro);

    return res.status(200).json(finish);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
}
