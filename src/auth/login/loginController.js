import { loginService } from "./loginService.js";

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios!" });
    }

    const { token, refreshToken } = await loginService({
      email,
      password,
    });

    return res.status(200).json({
      message: "Login realizado com sucesso!",
      token,
      refreshToken,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
