import { AppDataSource } from "../config/dbconnect.js";
import { User } from "../models/User.js";
import { UserProgress } from "../models/UserProgress.js"
import bcrypt from "bcrypt";
import emailWelcome from "../middlewares/emailWelcome.js";
import { UserMission } from "../models/UserMissions.js";
import { Mission } from "../models/missions.js";

import { ILike } from "typeorm";

export async function createRegisterService({ name, email, password }) {
  const userRepository = AppDataSource.getRepository(User);
  const progressRepository = AppDataSource.getRepository(UserProgress);
  const missionRepository = AppDataSource.getRepository(Mission);
  const userMissionRepository = AppDataSource.getRepository(UserMission);

  const userAlreadyExists = await userRepository.findOne({
    where: { email: ILike(email) },
  });
  if (userAlreadyExists) {
    throw new Error("Email já cadastrado!");
  }

  const userNameAlreadyExists = await userRepository.findOne({
    where: { name },
  });
  if (userNameAlreadyExists) {
    throw new Error("Nome de usuário já existente");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = userRepository.create({ name, email, password: hashedPassword });
  const newUser = await userRepository.save(user);

  const progress = progressRepository.create({user: newUser})
  const newProgress = await progressRepository.save(progress);

  function calculateResetAt(frequency) {
    if (frequency === "daily") {
    return new Date(Date.now() + 24 * 60 * 60 * 1000);
    }

    if (frequency === "weekly") {
      return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    }

    if (frequency === "monthly") {
      const now = new Date();
      now.setMonth(now.getMonth() + 1);
      return now;
    }
  }

  const missions = await missionRepository.find();

  const userMissions = missions.map((mission) => {
    return userMissionRepository.create({
      user: newUser,
      mission: mission,
      reset_at: calculateResetAt(mission.frequency)
    });
  });  
  await userMissionRepository.save(userMissions);

  delete newUser.password;

  try {
    emailWelcome({ user: newUser })
    .then(() => {
        console.log("Email de boas-vindas enviado com sucesso!");
    })
  } catch (error) {
    console.error("Erro ao enviar email de boas-vindas:", error);
  }

  return newUser;
}
