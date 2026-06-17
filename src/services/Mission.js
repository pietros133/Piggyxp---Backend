import { AppDataSource } from "../config/dbconnect.js";
import { Mission } from "../models/missions.js";

export async function MissionService(name, type, target, frequency, xp, coins, condition) {
  const missionRepository = AppDataSource.getRepository(Mission);
  
  const missionNameAlreadyExists = await missionRepository.findOne({
    where: { name },
  });
  
  if (missionNameAlreadyExists) {
    throw new Error("Missão já existente");
  }
  
  const mission = missionRepository.create({ name, type, target, frequency, xp, coins, condition });
  await missionRepository.save(mission);
  
  return {
    message: "Missão registrada",
  };
}