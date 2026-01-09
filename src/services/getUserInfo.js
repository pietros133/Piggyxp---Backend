import { AppDataSource } from "../config/dbconnect.js";
import { User } from "../models/User.js";

export async function getUserInfoService(userId) {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      user_img: true,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return user;
}
