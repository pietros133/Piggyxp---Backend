import { homeService } from "../services/home.service.js";

export async function homeController(req, res) {
  try {
    const id = req.user.id;

    if (!id) {
      return res.status(400).json({ message: "userId é obrigatório" });
    }

    const home = await homeService(Number(id));

    return res.status(200).json(home);
  } catch (err) {
    return res.status(404).json({
      message: err.message || "Erro ao buscar informações da home",
    });
  }
}
