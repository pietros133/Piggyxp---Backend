import type { Request, Response } from "express";

import { giveUserRewards } from "../services/userRewardsService.ts";

type ReqParams = { userId: string };

type ReqBody = {
  achievementId: number;
};

export async function achievementsRewardsController(
  req: Request<ReqParams, {}, ReqBody>,
  res: Response,
) {
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
  } catch (error: any) {
    return res
      .status(500)
      .send({ error: "Erro no servidor: " + error.message });
  }
}
