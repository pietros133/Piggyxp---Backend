import { AppDataSource } from "../config/dbconnect.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import autoemail from "../middlewares/autoemail.js";

export async function createRegisterService({ name, email, password }) {
  const userRepository = AppDataSource.getRepository(User);

  const userAlreadyExists = await userRepository.findOne({ where: { email } });
  if (userAlreadyExists) {
    throw new Error("Email já cadastrado!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = userRepository.create({ name, email, password: hashedPassword });
  const newUser = await userRepository.save(user);

  delete newUser.password;

  try {
    await autoemail({ user: newUser });
    console.log("Email de boas-vindas enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar email de boas-vindas:", error);
  }

  return newUser;
}
