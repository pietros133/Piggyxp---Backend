import { TitlesService } from "../services/TitlesService.js";

export async function TitlesController(req, res) {
  try {
    const result = await TitlesService();
    return res.status(200).json({
      message: "Importação dos títulos concluída!",
      files: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Erro ao importar os títulos",
      error: err.message,
    });
  }
}