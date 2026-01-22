import { deleteUserService } from "../services/deleteUserService.js";

export async function deleteUserController(req, res) {
  const userId = req.params.id; // Colocar ID na URL,igual o update

  try {
    const result = await deleteUserService(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}