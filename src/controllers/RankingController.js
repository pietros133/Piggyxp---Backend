import { response } from "express";
import { RankService } from "../services/RankService.js";

export async function RankServiceController(Resquest,Response) {
    try{
        const ranking = await RankService();    
        return Response.json(ranking)
    }catch{
        return Response.status(500).json({ message: "Error fetching rankink"});
    }
}