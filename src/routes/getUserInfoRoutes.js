import express from "express";
import { getUserInfoController } from "../controllers/GetUserInfoController.js";

const Router = express.Router();

Router.get("/userInfo", getUserInfoController);

export default Router;
