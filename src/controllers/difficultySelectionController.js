import { difficultySelectionService } from "../services/difficultySelectionService.js";

export async function difficultySelectionController(req, res) {
  try {
    const { difficulty } = req.body;
    const userId = req.user.id;

    await difficultySelectionService(userId, difficulty);

    return res.status(200).json({
      message: "Dificuldade definida com sucesso!",
    });
  } catch (err) {
    return res.status(500).json({ message: "Erro: " + err });
  }
}
