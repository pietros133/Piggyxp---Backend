import fs from "fs";
import path from "path";
import { MongoDataSource } from "../mongo/database/mdbconnect.js";
import { Titles } from "../mongo/models/Title.js";

export async function TitlesService() {
  
  const titlesRepository = MongoDataSource.getMongoRepository(Titles);

  // Pasta que contém as unidades
  const unitsFolder = path.resolve("./src/content/tittles");
  const unitDirs = fs.readdirSync(unitsFolder, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const insertedFiles = [];

  for (const unit of unitDirs) {
    const titlesFilePath = path.join(unitsFolder, unit, "tittles.json");

    if (!fs.existsSync(titlesFilePath)) continue; // pula se não existir

    const rawData = fs.readFileSync(titlesFilePath, "utf-8");
    if (!rawData) continue; // pula se estiver vazio

    const titlesData = JSON.parse(rawData);
    if (!titlesData.tittles || titlesData.tittles.length === 0) continue; // pula se não tiver fases

    // Adiciona o campo 'unit' em cada fase
    const dataWithUnit = titlesData.tittles.map(titles => ({
      ...titles,
      unit:parseInt(unit.replace("unit", "")),
    }));

    const result = await titlesRepository.insertMany(dataWithUnit);
    insertedFiles.push({ unit, insertedCount: result.insertedCount });
  }

  return {
    files: insertedFiles
  };
}