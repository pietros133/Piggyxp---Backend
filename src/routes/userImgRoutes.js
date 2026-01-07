import express from "express";
import { uploadUserImgController } from "../controllers/UploadUserImgController.js";
import { upload } from "../middlewares/upload.js";

const Router = express.Router();

Router.post("/upload-user-img", upload.single("file"), uploadUserImgController);

export default Router;
