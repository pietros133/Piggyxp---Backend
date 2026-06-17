import { AppDataSource } from "../config/dbconnect.js";
import { UserProgress } from "../models/UserProgress.js";

export async function getUserProgressInfoService(userId) {
  const userRepository = AppDataSource.getRepository(UserProgress);

  const progress = await userRepository.findOne({
    where: { user: { id: userId } },
    select: {
      id: true,
      nivel: true,
      xp: true,
      coins: true,
      lives: true,
      reset_lives_at: true,
      nivel_ph: true,
    },
  });

  if (!progress) {
    throw new Error("Progresso não existente");
  }

  return progress;
}
