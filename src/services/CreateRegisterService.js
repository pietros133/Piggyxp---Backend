import { AppDataSource } from "../config/dbconnect.js";
import { User } from "../models/User.js";
import { UserProgress } from "../models/UserProgress.js"
import bcrypt from "bcrypt";
import emailWelcome from "../middlewares/emailWelcome.js";

import { ILike } from "typeorm";

export async function createRegisterService({ name, email, password }) {
  const userRepository = AppDataSource.getRepository(User);
  const progressRepository = AppDataSource.getRepository(UserProgress);

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

  delete newUser.password;

  try {
    await emailWelcome({ user: newUser });
    console.log("Email de boas-vindas enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar email de boas-vindas:", error);
  }

  return newUser;
}
