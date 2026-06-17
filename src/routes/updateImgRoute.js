import express from "express";
import { updateImgController } from "../controllers/updateImgController.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.put("/update-user-img", upload.single("image"), updateImgController);

export default router;