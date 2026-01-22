import { updateUserService } from "../services/updateUserService.js";

export async function updateUserController(req, res) {

    try {
    const { id } = req.params;
    const { name, email } = req.body;

    // Validação básica
    if (!id) {
      return res.status(400).json({ message: "ID do usuário é obrigatório" });
    }

    if (!name && !email) {
      return res
      .status(400)
      .json({
        message: "Informe ao menos um campo para atualização",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      return res.status(400).json({ message: "Email inválido!" });
    }

    const updatedUser = await updateUserService(id, { name, email });

    return res.status(200).json({
      message: "Usuário atualizado com sucesso",
      user: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
       message: err.message || "Erro ao atualizar usuário!",
    });
  }
}