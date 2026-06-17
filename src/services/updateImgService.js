import { AppDataSource } from "../config/dbconnect.js";
import { User } from "../models/User.js";
import cloudinary from "../config/cloudinaryconfig.js";

export async function updateImgService(userId, file) {
  if (!file) {
    throw new Error("Imagem não enviada!");
  }

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("Usuário não encontrado!");
  }

  const result = await cloudinary.uploader.upload(
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
    {
      folder: "users",
      public_id: `user_${userId}`,
      overwrite: true,
      resource_type: "image",
    },
  );

  user.user_img = result.secure_url;
  await userRepository.save(user);

  return {
    user_img: result.secure_url,
  };
}