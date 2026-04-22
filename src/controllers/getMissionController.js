import { getMissionService } from "../services/getMissionService.js";

export async function getMissionController(req, res) {
  try {
    const { id } = req.body;

    if(!id) {
      res.status(400).json({message: "Informar id é obrigatório"});
    }
    const missions = await getMissionService(id);

    return res.status(201).json(missions);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
}