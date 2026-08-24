import fs from "fs";
import path from "path";
import {
  collection,
  addDoc,
} from "firebase/firestore";

import { db } from "../firebase/fbconnect.js";

export async function PhasesService() {
  const phasesCollection = collection(db, "phases");

  const unitsFolder = path.resolve("./src/content/units");

  const unitDirs = fs
    .readdirSync(unitsFolder, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const insertedFiles = [];

  for (const unit of unitDirs) {
    const phaseFilePath = path.join(
      unitsFolder,
      unit,
      "phases.json"
    );

    if (!fs.existsSync(phaseFilePath)) continue;

    const rawData = fs.readFileSync(phaseFilePath, "utf-8");

    if (!rawData) continue;

    const phasesData = JSON.parse(rawData);

    if (!phasesData.phases || phasesData.phases.length === 0) {
      continue;
    }

    const dataWithUnit = phasesData.phases.map((phase) => ({
      ...phase,
      unit: parseInt(unit.replace("unit", "")),
    }));

    for (const phase of dataWithUnit) {
      await addDoc(phasesCollection, phase);
    }

    insertedFiles.push({
      unit,
      insertedCount: dataWithUnit.length,
    });
  }

  return {
    files: insertedFiles,
  };
}