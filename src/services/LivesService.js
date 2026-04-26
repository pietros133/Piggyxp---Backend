import { AppDataSource } from "../config/dbconnect.js";
import { UserProgress } from "../models/UserProgress.js";

export async function LivesService(userId, erro) {
  const userProgressRepository = AppDataSource.getRepository(UserProgress);

  const user = await userProgressRepository.findOne({
    where: { user: { id: userId } },
    select: {
          id: true,
          lives: true,
          reset_lives_at: true
        },
  });

  if(!user){
    throw new Error("Usuário inexistente");
  }

  user.lives = Math.max(0, user.lives - erro);
  
  if (user.lives < 5 && !user.reset_lives_at && user.lives != 0) {
    user.reset_lives_at = new Date(Date.now() + 12 * 60 * 1000);
  }
  
  if (user.lives === 0 && !user.reset_lives_at) {
    user.reset_lives_at = new Date(Date.now() + 5 * 60 * 60 * 1000);
  }

  await userProgressRepository.save(user);

  return {
    message: "Vida atualizada com sucesso",
  };
}