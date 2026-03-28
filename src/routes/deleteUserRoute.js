import express from "express";
import { deleteUserController } from "../controllers/deleteUserController.js";

const Router = express.Router();

Router.delete("/deleteUser/:id", deleteUserController);

export default Router;

