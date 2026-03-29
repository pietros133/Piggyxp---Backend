import type { Request, Response } from "express";

import { AppDataSource } from "../config/dbconnect.js";
import { User } from "../models/User.js";

import { setUserAchievements } from "../services/achievementsService.ts";

type ReqParams = {
  userId: string;
};

export async function achievementsController(
  req: Request<ReqParams>,
  res: Response,
) {
  try {
    const { userId } = req.params;

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error("Usuário inválido!");
    }

    const actualAchievements = user.achievements as string;

    /* SE ELE JÁ COMPLETOU AS CONQUISTAS, JÁ RETORNA A RESPOSTA */
    if (actualAchievements === "1".repeat(actualAchievements.length)) {
      return res
        .status(200)
        .send({ message: "O usuário já completou todas as conquistas." });
    }

    const newAchievements = await setUserAchievements(Number(userId));

    if (actualAchievements === newAchievements) {
      return res.status(200).send({ message: "Nenhuma conquista nova" });
    }

    return res.status(200).send({
      message: "Conquistas verificadas com sucesso!",
      newAchievements,
    });
  } catch (error: any) {
    return res
      .status(500)
      .send({ error: "Erro no servidor: " + error.message });
  }
}
