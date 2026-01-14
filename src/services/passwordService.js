import { AppDataSource } from "../config/dbconnect.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import randomcode from "../middlewares/randomcode.js";
import emailRecoveryPassword from "../middlewares/emailRecoveryPassword.js";
import { ILike } from "typeorm";

export async function sendRecoveryCode(email) {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { email: ILike(email.trim()) },
  });
  if (!user) throw new Error("Email não cadastrado!");

  const code = String(randomcode()); // converte código para string
  user.recovery_code = code;
  user.recovery_code_expiration = new Date(Date.now() + 10 * 60 * 1000); // seta tempo de validade do codigo: 10min

  await userRepository.save(user);

  await emailRecoveryPassword({ user, code });

  // Apenas uma mensagem informativa no console
  console.log(`Email de Troca de Senha enviado!`);

  return { message: "Código de recuperação enviado!" };
}

export async function resetPasswordWithCode(code, newPassword) {
  const userRepository = AppDataSource.getRepository(User);
  const cleanCode = String(code).trim();

  const user = await userRepository.findOne({
    where: { recovery_code: cleanCode },
  });

  if (!user) throw new Error("Código inválido!");
  if (
    !user.recovery_code_expiration ||
    user.recovery_code_expiration < new Date()
  ) {
    throw new Error("Código expirado!");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.recovery_code = null;
  user.recovery_code_expiration = null;

  await userRepository.save(user);

  return { message: "Senha atualizada com sucesso!" };
}
