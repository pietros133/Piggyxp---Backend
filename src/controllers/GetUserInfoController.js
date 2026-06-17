import { getUserInfoService } from "../services/getUserInfoService.js";

export async function getUserInfoController(req, res) {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId é obrigatório" });
    }

    const user = await getUserInfoService(Number(userId));

    return res.status(200).json(user);
  } catch (err) {
    return res.status(404).json({
      message: err.message || "Erro ao buscar usuário",
    });
  }
}
