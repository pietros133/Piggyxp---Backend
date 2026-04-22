import { AppDataSource } from "../config/dbconnect.js";
import { UserMission } from "../models/UserMissions.js";

export async function getMissionService(userId) {
  const userMissionRepo = AppDataSource.getRepository(UserMission);
  
  const missions = await userMissionRepo.find({
    where: {
      selected: true,
      user: {
        id: userId,
      },
    },
    relations: {
      mission: true,
      user: true,
    },
    select: {
      progress: true,
      completed: true,
      reset_at: true,
      user: {
        id: true
      },
      mission: {
        name: true,
        target: true,
        frequency: true,
        xp: true,
        coins: true
      },
    },
  });

  if(!missions || missions.length === 0) {
    throw new Error("Missões não encontradas")
  }
  
  return missions;
}