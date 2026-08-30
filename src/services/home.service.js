import { AppDataSource } from "../config/dbconnect.js";

import { User } from "../models/User.js";
import { UserProgress } from "../models/UserProgress.js";

import { AllAchievements } from "../content/achievements/Achievements.js";

function updateNivel(userProgress) {
  const initialNivel = userProgress.nivel;
  const initialXp = userProgress.xp;

  let requiredXp = 50 + userProgress.nivel * 25 + userProgress.nivel ** 2 * 10;

  while (userProgress.xp >= requiredXp) {
    userProgress.xp -= requiredXp;
    userProgress.nivel += 1;

    requiredXp = 50 + userProgress.nivel * 25 + userProgress.nivel ** 2 * 10;
  }

  const changed =
    userProgress.nivel !== initialNivel || userProgress.xp !== initialXp;

  return { xpProximoNivel: requiredXp, changed };
}

function updateAchievements(user, userProgress) {
  const actualAchievements = user.achievements;

  if (actualAchievements === "1".repeat(actualAchievements.length)) {
    return { achievements: actualAchievements, newAchievements: null };
  }

  let achievements = "";

  for (let i = 0; i < actualAchievements.length; i++) {
    if (actualAchievements[i] === "1") {
      achievements += "1";
      continue;
    }

    achievements += AllAchievements[i].condition(user, userProgress)
      ? "1"
      : "0";
  }

  const changed = achievements !== actualAchievements;

  return { achievements, newAchievements: changed ? achievements : null };
}

export async function homeService(userId) {
  const userRepository = AppDataSource.getRepository(User);
  const userProgressRepository = AppDataSource.getRepository(UserProgress);

  const [user, userProgress] = await Promise.all([
    userRepository.findOne({ where: { id: userId } }),
    userProgressRepository.findOne({ where: { user: { id: userId } } }),
  ]);

  if (!user) {
    throw new Error("Usuário inválido!");
  }

  if (!userProgress) {
    throw new Error("Progresso não existente");
  }

  const { xpProximoNivel, changed: nivelChanged } = updateNivel(userProgress);
  const { achievements, newAchievements } = updateAchievements(
    user,
    userProgress,
  );

  const achievementsChanged = newAchievements !== null;

  user.achievements = achievements;

  await Promise.all([
    nivelChanged
      ? userProgressRepository.save(userProgress)
      : Promise.resolve(),
    achievementsChanged ? userRepository.save(user) : Promise.resolve(),
  ]);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    user_img: user.user_img,
    difficulty: user.difficulty,
    first_login: user.first_login,
    achievements,
    newAchievements,
    collectedAchievements: user.collectedAchievements,
    nivel: userProgress.nivel,
    nivel_ph: userProgress.nivel_ph,
    xp: userProgress.xp,
    xpProximoNivel,
    coins: userProgress.coins,
    lives: userProgress.lives,
    reset_lives_at: userProgress.reset_lives_at,
  };
}
