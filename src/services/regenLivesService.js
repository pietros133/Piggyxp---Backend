import { AppDataSource } from "../config/dbconnect.js";
import { UserProgress } from "../models/UserProgress.js";

export async function RegenLivesService(userId) {
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
    throw new Error("Usuário não encontrado");
  }

  if (user.lives === 5) {
    throw new Error("Sem vida para resetar");
  }
  
  if( user.reset_lives_at && user.reset_lives_at < Date.now()){
    if (user.lives < 5) {
        if (user.lives === 0) {
            user.lives = 5;
        } else if (user.lives > 0 && user.lives < 5) {
            user.lives += 1;
        }
    }
  
    user.reset_lives_at = null;
  }
  
  if (user.lives < 5 && !user.reset_lives_at && user.lives != 0) {
    user.reset_lives_at = new Date(Date.now() + 12 * 60 * 1000);
  }
  
  if (user.lives === 0 && !user.reset_lives_at) {
    user.reset_lives_at = new Date(Date.now() + 5 * 60 * 60 * 1000);
  }

  await userProgressRepository.save(user);

  return {
    message: "Regeneração iniciada",
  };
}
