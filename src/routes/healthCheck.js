import { Router } from "express";

const router = Router();

router.get("/", healthCheck);

export function healthCheck(req, res) {
  return res.status(200).json({
    message: "OK",
  });
}
