import { LivesService } from "../services/LivesService.js"; 
import jwt from "jsonwebtoken"; 

export async function LivesController(req, res) {
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
    const id = decoded.id;
    const { erro } = req.body;

    if(!erro){
        return res.status(400).json({
            message: "informe a quantidade de erros."
        })
    }

    const live = await LivesService(id, erro);

    return res.status(200).json(live);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
}
