import { AppDataSource } from "../config/dbconnect.js";
import { User } from "../models/User.js";

export async function uploadUserImgService(userId, imgpath) {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("Usuário não encontrado!");
  }

  user.user_img = imgpath;

  const updatedUser = await userRepository.save(user);

  delete updatedUser.password;
  return updatedUser;
}
