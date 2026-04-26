import { MongoDataSource } from "../mongo/database/mdbconnect.js";
import { AppDataSource } from "../config/dbconnect.js";
import { Phases } from "../mongo/models/Phases.js";
import { UserProgress } from "../models/UserProgress.js";

export async function FinishPhaseService(userDifficulty, userOrder, userUnit, userId) {
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
          xp: true,
          coins: true,
          lives: true
        },
  });

  if(!user){
    throw new Error("Usuário inexistente");
  }

  if(user.lives == 0) {
    throw new Error("Vidas acabaram")
  }

  if(user.lives > 0){
    user.xp += phase.rewards.xp;
    user.coins += phase.rewards.coins;
  }
  
  await userProgressRepository.save(user);

  return {
    message: "Fase finalizada com sucesso",
  };
}
