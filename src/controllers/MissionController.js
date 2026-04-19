import { MissionService } from "../services/Mission.js";

export async function MissionController(req, res) {
  try {
    const { name, type, target, frequency, xp, coins, condition } = req.body;

    const newMission = await MissionService(name, type, target, frequency, xp, coins, condition);

    return res.status(201).json(newMission);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
}