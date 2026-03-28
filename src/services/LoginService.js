import { AppDataSource } from "../config/dbconnect.js";
import { User } from "../models/User.js";
import { RefreshToken } from "../models/RefreshToken.js";
import bcrypt from "bcrypt";
import { ILike } from "typeorm";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export async function loginService({ email, password }) {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { email: ILike(email) } });
  if (!user) throw new Error("Usuário não encontrado!");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error("Email ou senha incorreta");

  // gerar JWT
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshTokenValue = crypto.randomBytes(64).toString("hex");

  // salva refresh token no bd
  const refreshTokenRepo = AppDataSource.getRepository(RefreshToken);
  const refreshToken = refreshTokenRepo.create({
    token_hash: refreshTokenValue,
    user: { id: user.id },
  });
  await refreshTokenRepo.save(refreshToken);

  return {
    token,
    refreshToken: refreshTokenValue,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}
