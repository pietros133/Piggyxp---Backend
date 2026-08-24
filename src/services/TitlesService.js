import fs from "fs";
import path from "path";
import {
  collection,
  addDoc,
} from "firebase/firestore";

import { db } from "../firebase/fbconnect.js";

export async function TitlesService() {
  const titlesCollection = collection(db, "titles");

  // Pasta que contém as unidades
  const unitsFolder = path.resolve("./src/content/tittles");

  const unitDirs = fs
    .readdirSync(unitsFolder, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const insertedFiles = [];

  for (const unit of unitDirs) {
    const titlesFilePath = path.join(
      unitsFolder,
      unit,
      "tittles.json"
    );

    if (!fs.existsSync(titlesFilePath)) continue;

    const rawData = fs.readFileSync(titlesFilePath, "utf-8");

    if (!rawData) continue;

    const titlesData = JSON.parse(rawData);

    if (!titlesData.tittles || titlesData.tittles.length === 0) {
      continue;
    }

    // Adiciona o campo "unit" em cada título
    const dataWithUnit = titlesData.tittles.map((title) => ({
      ...title,
      unit: parseInt(unit.replace("unit", "")),
    }));

    let insertedCount = 0;

    for (const title of dataWithUnit) {
      await addDoc(titlesCollection, title);
      insertedCount++;
    }

    insertedFiles.push({
      unit,
      insertedCount,
    });
  }

  return {
    files: insertedFiles,
  };
}