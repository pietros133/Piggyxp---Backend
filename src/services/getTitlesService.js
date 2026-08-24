import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/fbconnect.js";

export async function getTitlesService(userDifficulty, userUnit) {
  const titlesCollection = collection(db, "titles");

  const titlesQuery = query(
    titlesCollection,
    where("difficulty", "==", Number(userDifficulty)),
    where("unit", "==", Number(userUnit))
  );

  const snapshot = await getDocs(titlesQuery);

  if (snapshot.empty) {
    throw new Error("Título não encontrado");
  }

  const title = snapshot.docs[0];

  return {
    id: title.id,
    ...title.data(),
  };
}