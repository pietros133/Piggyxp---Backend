import { AppDataSource } from "../config/dbconnect.js";
import { UserMission } from "../models/UserMissions.js";
import { User } from "../models/User.js";

const MISSION_TYPES = {
  COMPLETE_PHASES: "complete_phases",
  CORRECT_ANSWERS: "correct_answers",
  STREAK: "streak",
  LOGIN_DAYS: "login_days",
  PERFECT_RUN: "perfect_run",
  COMPLETE_UNIT: "complete_unit",
};

export async function UpdateMissionService(userId, erro, acerts, streak, completePhase, completeUnit, login) {
  const userMissionRepository = AppDataSource.getRepository(UserMission);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) throw new Error("Usuário não encontrado");

  const missions = await userMissionRepository.find({
    where: {
      user: { id: userId },
      selected: true,
    },
    relations: {
      mission: true,
    },
  });

  if (!missions.length) {
    return { message: "Sem missões ativas" };
  }

  for (const userMission of missions) {
    const mission = userMission.mission;

    if (!mission || userMission.completed) continue;

    if (mission.type === MISSION_TYPES.COMPLETE_PHASES) {
      if (completePhase) {
        userMission.progress += 1;
      }
    }

    if (mission.type === MISSION_TYPES.CORRECT_ANSWERS && mission.condition == null) {
      userMission.progress += acerts;
    }

    if(mission.type === MISSION_TYPES.CORRECT_ANSWERS && mission.condition == "no_errors"){
      if(erro > 0){
        userMission.progress = 0;
      }else{
        userMission.progress += acerts;
      }
    }

    if (mission.type === MISSION_TYPES.STREAK) {
      if(streak){
        userMission.progress += 1;
      }
    }

    if (mission.type === MISSION_TYPES.LOGIN_DAYS) {
      if(login){
        userMission.progress += 1;
      }
      
    }

    if (mission.type === MISSION_TYPES.PERFECT_RUN && mission.condition == "no_errors"){
      if(erro > 0){
        userMission.progress = 0;
      } else {
        userMission.progress += 1;
      }
    }

    if (mission.type === MISSION_TYPES.COMPLETE_UNIT) {
      if(completeUnit){
        userMission.progress += 1;
      }
    }

    if (userMission.progress > mission.target) {
      userMission.progress = mission.target;
    }

    if (userMission.progress >= mission.target && !userMission.completed) {
      userMission.completed = true;

      user.xp += mission.xp;
      user.coins += mission.coins;
    }
  }

  await userMissionRepository.save(missions);
  await userRepository.save(user);

  return {
    message: "Missões atualizadas",
  };
}