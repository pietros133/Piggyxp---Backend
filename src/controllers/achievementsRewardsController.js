import { giveUserRewards } from "../services/userRewardsService.js";

export async function achievementsRewardsController(req, res) {
  try {
    const userId = Number(req.params.userId);
    const { achievementId } = req.body;

    if (achievementId == null) {
      return res.status(400).send({ error: "Dados incompletos." });
    }

    await giveUserRewards(userId, achievementId);

    return res
      .status(200)
      .send({ message: "Recompensa recebida com sucesso!" });
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Erro no servidor: " + error.message });
  }
}
