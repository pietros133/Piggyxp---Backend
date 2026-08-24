import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/fbconnect.js";

import { AppDataSource } from "../config/dbconnect.js";

import { UserProgress } from "../models/UserProgress.js";

export async function FinishPhaseService(
  userDifficulty,
  userOrder,
  userUnit,
  userId
) {
  const phasesCollection = collection(db, "phases");

  const phaseQuery = query(
    phasesCollection,
    where("dificulty", "==", Number(userDifficulty)),
    where("order", "==", Number(userOrder)),
    where("unit", "==", Number(userUnit))
  );

  const phaseSnapshot = await getDocs(phaseQuery);

  if (phaseSnapshot.empty) {
    throw new Error("Fase não encontrada");
  }

  const phaseDoc = phaseSnapshot.docs[0];
  const phase = phaseDoc.data();

  const userProgressRepository =
    AppDataSource.getRepository(UserProgress);

  const user = await userProgressRepository.findOne({
    where: { user: { id: userId } },
    select: {
      id: true,
      xp: true,
      coins: true,
      lives: true,
      nivel_ph: true,
    },
  });

  if (!user) {
    throw new Error("Usuário inexistente");
  }

  if (user.lives == 0) {
    throw new Error("Vidas acabaram");
  }

  if (user.lives > 0) {
    user.xp += phase.rewards.xp;
    user.coins += phase.rewards.coins;
    user.nivel_ph += 1;
  }

  await userProgressRepository.save(user);

  return {
    message: "Fase finalizada com sucesso",
  };
}