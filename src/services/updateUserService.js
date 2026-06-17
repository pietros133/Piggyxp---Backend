import { AppDataSource } from "../config/dbconnect.js";
import { User } from "../models/User.js";

export async function updateUserService(userId, data) {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("Usuário inexistente");
  }

  // Atualiza apenas os campos enviados
  user.name = data.name ?? user.name;
  user.email = data.email ?? user.email;

  await userRepository.save(user);

  return {
    name: user.name,
    email: user.email,
  };
}
