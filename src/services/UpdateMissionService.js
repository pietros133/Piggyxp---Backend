import { AppDataSource } from "../config/dbconnect.js";
import { UserMission } from "../models/UserMissions.js";


export async function UpdateMissionService(userId) {
  const userMissionRepo = AppDataSource.getRepository(UserMission);
  
  const missions = await userMissionRepo.find({
    where: {
      selected: true,
      user: {
        id: userId,
      },
    },
    relations: {
      mission: true
    },
    select: {
      progress: true,
      completed: true,
      reset_at: true,
      mission: {
        target: true,
        frequency: true,
        xp: true,
        coins: true,
        condition: true
      },
    },
  });

  if(!missions || missions.length === 0) {
    throw new Error("Missões não encontradas")
  }
  // em andamento
  return ;
}