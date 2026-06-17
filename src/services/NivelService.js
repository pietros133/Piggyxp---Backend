import { AppDataSource } from "../config/dbconnect.js";
import { UserProgress } from "../models/UserProgress.js";

export async function NivelService(userId) {
  const userProgressRepository = AppDataSource.getRepository(UserProgress);

  const user = await userProgressRepository.findOne({
    where: { user: { id: userId } },
    select: {
          id: true,
          nivel: true,
          xp: true
        },
  });

  if(!user){
    throw new Error("Usuário inexistente");
  }

  let requiredXp = 50 + user.nivel * 25+ (user.nivel**2) * 10;
  
  while (user.xp >= requiredXp) {
    user.xp -= requiredXp;
    user.nivel += 1;

    requiredXp = 50 + user.nivel * 25 + (user.nivel**2) * 10;
  }

  await userProgressRepository.save(user);

  return {
    message: "Nivel atualizado com sucesso",
    nivel: user.nivel,
    xpAtual: user.xp,
    xpNecessario: requiredXp,
  };
}