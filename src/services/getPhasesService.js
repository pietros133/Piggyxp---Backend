import phasesData from "../content/units/unit1/phases.json" with { type: "json" };

export async function getPhasesService(userDifficulty, userOrder) {
  const phases = phasesData.phases;

  const phase = phases.find(
    (p) =>
      p.dificulty === Number(userDifficulty) &&
      p.order === Number(userOrder)
  )

  if (!phase) {
    throw new Error("Fase não encontrada");
  }

  return phase;
}