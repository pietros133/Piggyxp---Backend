import { getUserProgressInfoService } from "../services/getUserProgressInfo.js";

export async function getUserProgressController(req, res) {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId é obrigatório" });
    }

    const progress = await getUserProgressInfoService(Number(userId));

    return res.status(200).json(progress);
  } catch (err) {
    return res.status(404).json({
      message: err.message || "Erro ao buscar progresso",
    });
  }
}
