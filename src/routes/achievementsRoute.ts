import express from "express";

import { achievementsController } from "../controllers/achievementsController.ts";
import { achievementsRewardsController } from "../controllers/achievementsRewardsController.ts";

const Router = express.Router();

Router.post("/achievements/verify/:userId", achievementsController);

Router.post("/achievements/rewards/:userId", achievementsRewardsController);

export default Router;
