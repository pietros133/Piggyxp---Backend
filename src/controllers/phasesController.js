import { PhasesService } from "../services/PhasesServices.js";

export async function PhasesController(req, res) {
  try {
    const result = await PhasesService();
    return res.status(200).json({
      message: "Importação de fases concluída!",
      files: result,
    });
  } catch (err) {
    console.error("Erro ao importar fases:", err);
    return res.status(500).json({
      message: "Erro ao importar fases",
      error: err.message,
    });
  }
}