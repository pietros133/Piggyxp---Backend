import { AppDataSource } from "../config/dbconnect.js";
import { RefreshToken } from "../models/RefreshToken.js";
import jwt from "jsonwebtoken";

export async function refreshTokenController(req, res) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh Token ausente!" });
  }

  try {
    const tokenRepo = AppDataSource.getRepository(RefreshToken);
    const tokenEntry = await tokenRepo.findOne({
      where: { token_hash: refreshToken },
      relations: ["user"],
    });

    if (!tokenEntry) {
      return res.status(403).json({ message: "Refresh token inválido!" });
    }

    const newAccessToken = jwt.sign(
      { userId: tokenEntry.user.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Refresh token inválido!" });
  }
}
