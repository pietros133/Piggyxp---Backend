import { createRegisterService } from "../services/CreateRegisterService.js";
import jwt from "jsonwebtoken";

export async function registerController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email inválido!" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Senha deve ter no mínimo 6 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 caractere especial!",
      });
    }

    const emojiRegex = /\p{Extended_Pictographic}/u;
    if(emojiRegex.test(name) || emojiRegex.test(password) || emojiRegex.test(email)){
      return res.status(400).json({message:"Não deve conter emojis."});
    }

    const newUser = await createRegisterService({ name, email, password });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Erro ao cadastrar usuário!",
    });
  }
}
