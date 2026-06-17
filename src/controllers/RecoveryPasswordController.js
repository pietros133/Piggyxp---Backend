import {
  sendRecoveryCode,
  resetPasswordWithCode,
} from "../services/passwordService.js";

export async function sendRecoveryCodeController(req, res) {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ message: "Email é obrigatório!" });

    const result = await sendRecoveryCode(email);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}

export async function resetPasswordController(req, res) {
  try {
    const { code, newPassword, confirmPassword } = req.body;

    if (!code || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios!" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "As senhas não coincidem!" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}$/;
    if (!passwordRegex.test(confirmPassword)) {
      return res.status(400).json({
        message:
          "Senha deve ter no mínimo 6 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 caractere especial!",
      });
    }

    const result = await resetPasswordWithCode(code, newPassword);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}