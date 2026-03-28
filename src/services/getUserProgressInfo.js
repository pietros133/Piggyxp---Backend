import { AppDataSource } from "../config/dbconnect.js";
import { UserProgress } from "../models/UserProgress.js";

export async function getUserProgressInfoService(progressId) {
    const userRepository = AppDataSource.getRepository(UserProgress);
    
      const progress = await userRepository.findOne({
        where: { id: progressId },
        select: {
          nivel: true,
          xp: true,
          coins: true,
        },
      });
    
      if (!progress) {
        throw new Error("Progresso não existente");
      }
    
      return progress;
}