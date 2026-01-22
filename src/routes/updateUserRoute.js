import express from "express";
import { updateUserController } from "../controllers/updateUserController.js";

const Router = express.Router();

Router.put("/updateUser/:id", updateUserController);

export default Router;

