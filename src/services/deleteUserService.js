import { AppDataSource } from "../config/dbconnect.js";
import { User } from "../models/User.js";

export async function deleteUserService(userId) {
  const userRepository = AppDataSource.getRepository(User);

  // Busca o usuário pelo ID recebido no parâmetro
  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  await userRepository.remove(user);

  return { message: `Usuário deletado com sucesso.` };
}
