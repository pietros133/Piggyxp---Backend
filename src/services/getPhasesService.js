import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/fbconnect.js";

export async function getPhasesService(
  userDifficulty,
  userOrder,
  userUnit
) {
  const phasesCollection = collection(db, "phases");

  const phasesQuery = query(
    phasesCollection,
    where("dificulty", "==", Number(userDifficulty)),
    where("order", "==", Number(userOrder)),
    where("unit", "==", Number(userUnit))
  );

  const snapshot = await getDocs(phasesQuery);

  if (snapshot.empty) {
    throw new Error("Fase não encontrada");
  }

  const phaseDoc = snapshot.docs[0];

  return {
    id: phaseDoc.id,
    ...phaseDoc.data(),
  };
}