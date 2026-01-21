import express from "express";
import { getUserProgressController } from "../controllers/getUserProgressInfoController.js";

const Router = express.Router();

Router.get("/progressInfo", getUserProgressController);

export default Router;
