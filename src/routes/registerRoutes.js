import express from "express";
import { registerController } from "../controllers/RegisterController.js";

const Router = express.Router();

Router.post("/register", registerController);

export default Router;
