import { Router } from "express";
import { uploadUserImgController } from "../controllers/UploadUserImgController.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

router.post(
  "/upload-user-img",
  upload.single("image"),
  uploadUserImgController
);

export default router;
