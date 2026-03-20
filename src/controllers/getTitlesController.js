import { getTitlesService } from "../services/getTitlesService.js"

export async function getTitlesController(req, res) {
  try {
    const { difficulty, unit } = req.query

    if (!difficulty || !unit) {
      return res.status(400).json({
        message: "unit e difficulty são obrigatórios"
      })
    }

    const title = await getTitlesService(difficulty, unit)

    return res.status(200).json(title)

  } catch (error) {
    return res.status(404).json({
      message: error.message
    })
  }
}
