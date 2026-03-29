import { AppDataSource } from "../config/dbconnect.js";

import type { UserType } from "../Types/UserType.ts";
import type { UserProgressType } from "../Types/UserProgressType.ts";

import { User } from "../models/User.js";
import { UserProgress } from "../models/UserProgress.js";

import { AllAchievements } from "../content/achievements/Achievements.js";

export async function setUserAchievements(userId: number) {
  let newAchievements = "";

  const userRepository = AppDataSource.getRepository(User);
  const userProgressRepository = AppDataSource.getRepository(UserProgress);

  const [user, userProgress] = (await Promise.all([
    userRepository.findOne({ where: { id: userId } }),
    userProgressRepository.findOne({ where: { id: userId } }),
  ])) as [UserType, UserProgressType];

  if (!user) throw new Error("Usuário inválido!");

  const actualAchievements = user.achievements;

  for (let i = 0; i < actualAchievements.length; i++) {
    if (actualAchievements[i] === "1") {
      newAchievements += "1";
      continue;
    }

    if (!AllAchievements[i].condition(user, userProgress)) {
      newAchievements += "0";
      continue;
    }

    newAchievements += "1";
  }

  user.achievements = newAchievements;
  await userRepository.save(user);

  return newAchievements;
}
