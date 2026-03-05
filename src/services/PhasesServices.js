import fs from "fs";
import path from "path";
import { MongoDataSource } from "../mongo/database/mdbconnect.js";
import { Phases } from "../models/Phases.js";

export async function PhasesService() {
  
  const phasesRepository = MongoDataSource.getMongoRepository(Phases);

  // Pasta que contém as unidades
  const unitsFolder = path.resolve("./src/content/units");
  const unitDirs = fs.readdirSync(unitsFolder, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const insertedFiles = [];

  for (const unit of unitDirs) {
    const phaseFilePath = path.join(unitsFolder, unit, "phases.json");

    if (!fs.existsSync(phaseFilePath)) continue; // pula se não existir

    const rawData = fs.readFileSync(phaseFilePath, "utf-8");
    if (!rawData) continue; // pula se estiver vazio

    const phasesData = JSON.parse(rawData);
    if (!phasesData.phases || phasesData.phases.length === 0) continue; // pula se não tiver fases

    // Adiciona o campo 'unit' em cada fase
    const dataWithUnit = phasesData.phases.map(phase => ({
      ...phase,
      unit:parseInt(unit.replace("unit", "")),
    }));

    const result = await phasesRepository.insertMany(dataWithUnit);
    insertedFiles.push({ unit, insertedCount: result.insertedCount });
  }

  return {
    files: insertedFiles
  };
}