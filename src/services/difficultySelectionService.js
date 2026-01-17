import { AppDataSource } from "../config/dbconnect.js";
import { User } from "../models/User.js";
export async function difficultySelectionService(userId, difficulty) {
  const userRepository = AppDataSource.getRepository(User);

  const diff = Number(difficulty);
  if (![0, 1, 2].includes(diff)) {
    throw new Error("Dificuldade inválida");
  }

  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  user.difficulty = diff;

  await userRepository.save(user);
}
