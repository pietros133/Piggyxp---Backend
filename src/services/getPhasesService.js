import { MongoDataSource } from "../mongo/database/mdbconnect.js";
import { Phases } from "../mongo/models/Phases.js";

export async function getPhasesService(userDifficulty, userOrder, userUnit) {
  const phasesRepository = MongoDataSource.getMongoRepository(Phases);

  const phase = await phasesRepository.findOneBy({
      dificulty: Number(userDifficulty),
      order: Number(userOrder),
      unit: Number(userUnit)
  })

  if (!phase) {
    throw new Error("Fase não encontrada");
  }

  return phase;
}