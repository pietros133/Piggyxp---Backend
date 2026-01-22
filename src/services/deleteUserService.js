import { AppDataSource } from "../config/dbconnect.js";
import { User } from "../models/User.js";

export async function deleteUserService(userId) {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("Usuário inexistente");
  }

  // Remove o usuário do banco de dados
  await userRepository.remove(user);

  return { message: `Usuário ${user.name} deletado com sucesso.` };
}
