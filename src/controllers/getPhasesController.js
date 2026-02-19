import { getPhasesService } from "../services/getPhasesService.js"

export async function getPhasesController(req, res) {
  try {
    const { difficulty, order } = req.query

    if (!difficulty || !order) {
      return res.status(400).json({
        message: "difficulty e order são obrigatórios"
      })
    }

    const phase = await getPhasesService(difficulty, order)

    return res.status(200).json(phase)

  } catch (error) {
    return res.status(404).json({
      message: error.message
    })
  }
}
