import { MongoDataSource } from "../mongo/database/mdbconnect.js";
import { Titles } from "../mongo/models/Title.js"; 

export async function getTitlesService(userDifficulty, userUnit) {
  const titlesRepository = MongoDataSource.getMongoRepository(Titles);

  const title = await titlesRepository.findOneBy({
      difficulty: Number(userDifficulty),
      unit: Number(userUnit)
  })

  if (!title) {
    throw new Error("Título não encontrado");
  }

  return title;
}