import { AppDataSource } from "../config/dbconnect.js";
import { User } from "../models/User.js";
import cloudinary from "../config/cloudinaryconfig.js";

export async function uploadUserImgService(userId, imgpath) {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("Usuário não encontrado!");
  }

  const result = await cloudinary.uploader.upload(imgpath, {
    folder: "users",
  });

  user.user_img = result.secure_url;

  const updatedUser = await userRepository.save(user);

  delete updatedUser.password;
  return updatedUser;
}
