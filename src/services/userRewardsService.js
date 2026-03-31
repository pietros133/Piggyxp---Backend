import { AppDataSource } from "../config/dbconnect.js";

import { User } from "../models/User.js";
import { UserProgress } from "../models/UserProgress.js";

import { AllAchievements } from "../content/achievements/Achievements.js";

export async function giveUserRewards(userId, achievementId) {
  const userRepository = AppDataSource.getRepository(User);
  const userProgressRepository = AppDataSource.getRepository(UserProgress);

  const [user, userProgress] = await Promise.all([
    userRepository.findOne({ where: { id: userId } }),
    userProgressRepository.findOne({ where: { id: userId } }),
  ]);

  if (!user) throw new Error("Usuário inválido!");
  if (!userProgress) throw new Error("Usuário não possui progresso!");

  const { rewardCoins, rewardXp } = AllAchievements[achievementId];

  const arr = user.collectedAchievements.split("");
  arr[achievementId] = "1";
  user.collectedAchievements = arr.join("");

  userProgress.coins += rewardCoins;
  userProgress.xp += rewardXp;

  await Promise.all([
    userRepository.save(user),
    userProgressRepository.save(userProgress),
  ]);
}
