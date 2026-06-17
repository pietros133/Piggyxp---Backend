import express from "express";

import { achievementsController } from "../controllers/achievementsController.js";
import { achievementsRewardsController } from "../controllers/achievementsRewardsController.js";

const Router = express.Router();

Router.post("/achievements/verify/:userId", achievementsController);

Router.post("/achievements/rewards/:userId", achievementsRewardsController);

export default Router;
