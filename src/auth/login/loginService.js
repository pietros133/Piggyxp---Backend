import { AppDataSource } from "../../config/dbconnect.js";
import { User } from "../../models/User.js";
import { RefreshToken } from "../../models/RefreshToken.js";
import bcrypt from "bcrypt";
import { ILike } from "typeorm";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { UserMission } from "../../models/UserMissions.js";
import { Mission } from "../../models/missions.js";
import { UserProgress } from "../../models/UserProgress.js";

export async function loginService({ email, password }) {
  const userRepository = AppDataSource.getRepository(User);
  const missionRepository = AppDataSource.getRepository(Mission);
  const userMissionRepository = AppDataSource.getRepository(UserMission);
  const userProgressRepository = AppDataSource.getRepository(UserProgress);

  const user = await userRepository.findOne({ where: { email: ILike(email) } });
  if (!user) throw new Error("Usuário não encontrado!");

  const userProgress = await userProgressRepository.findOne({
    where: {
      user: {
        id: user.id,
      },
    },
  });

  if (!userProgress) {
    throw new Error("Progresso do usuário não encontrado");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error("Email ou senha incorreta");

  // gerar JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshTokenValue = crypto.randomBytes(64).toString("hex");

  // salva refresh token no bd
  const refreshTokenRepo = AppDataSource.getRepository(RefreshToken);
  const refreshToken = refreshTokenRepo.create({
    token_hash: refreshTokenValue,
    user: { id: user.id },
  });
  await refreshTokenRepo.save(refreshToken);

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

  // Pega todos os UserMissions do usuário
  const existingUserMissions = await userMissionRepository.find({
    where: {
      user: { id: user.id },
    },
    relations: ["mission"],
  });

  // Olha todas as missões existentes
  const existingMissionIds = new Set(
    existingUserMissions.map((um) => um.mission.id),
  );

  // Ver quais ele não tem
  const missingMissions = missions.filter(
    (mission) => !existingMissionIds.has(mission.id),
  );

  // Cria apenas as que falta
  const userMissionsToCreate = missingMissions.map((mission) => {
    return userMissionRepository.create({
      user: user,
      mission: mission,
      reset_at: calculateResetAt(mission.frequency),
    });
  });

  // salva só as que não tem
  if (userMissionsToCreate.length > 0) {
    await userMissionRepository.save(userMissionsToCreate);
  }

  //Ofensiva
  const now = new Date();

  if (!user.last_login) {
    user.last_login = now;
    userProgress.offensive_days = 1;
  } else {
    const lastLogin = new Date(user.last_login);

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastDay = new Date(lastLogin.getFullYear(), lastLogin.getMonth(), lastLogin.getDate());

    const diffTime = today - lastDay;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      userProgress.offensive_days += 1;
    } else if(diffDays > 1){
      userProgress.offensive_days = 1;
    }
  
    user.last_login = now;
  }

  await userRepository.save(user);
  await userProgressRepository.save(userProgress);

  return {
    token,
    refreshToken: refreshTokenValue,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}
