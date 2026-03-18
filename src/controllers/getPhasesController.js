import { getPhasesService } from "../services/getPhasesService.js"

export async function getPhasesController(req, res) {
  try {
    const { difficulty, order, unit } = req.query

    if (!difficulty || !order || !unit) {
      return res.status(400).json({
        message: "unit, difficulty e order são obrigatórios"
      })
    }

    const phase = await getPhasesService(difficulty, order, unit)

    return res.status(200).json(phase)

  } catch (error) {
    return res.status(404).json({
      message: error.message
    })
  }
}
