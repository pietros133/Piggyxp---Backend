import { MongoDataSource } from "../mongo/database/mdbconnect.js";
import { AppDataSource } from "../config/dbconnect.js";
import { Phases } from "../mongo/models/Phases.js";
import { UserProgress } from "../models/UserProgress.js";

export async function FinishPhaseService(userDifficulty, userOrder, userUnit, userId, erro) {
  const phasesRepository = MongoDataSource.getMongoRepository(Phases);
  const userProgressRepository = AppDataSource.getRepository(UserProgress);

  const phase = await phasesRepository.findOneBy({
    dificulty: Number(userDifficulty),
    order: Number(userOrder),
    unit: Number(userUnit),

    select: {
        rewards: true
    }
  });
  
  if (!phase) {
    throw new Error("Fase não encontrada");
  }

  const user = await userProgressRepository.findOne({
    where: { user: { id: userId } },
    select: {
          id: true,
          lives: true,
          xp: true,
          coins: true,
          reset_lives_at: true
        },
  });

  if(!user){
    throw new Error("Usuário inexistente");
  }

  user.lives = Math.max(0, user.lives - erro);
  user.xp += phase.rewards.xp;
  user.coins += phase.rewards.coins;

  if (user.lives < 5 && !user.reset_lives_at) {
  user.reset_lives_at = new Date(Date.now() + 12 * 60 * 1000);
} 

  await userProgressRepository.save(user);

  return {
    message: "Fase finalizada com sucesso",
  };
}
