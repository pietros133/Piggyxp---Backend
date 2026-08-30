import express from "express";

import { achievementsRewardsController } from "../controllers/achievementsRewardsController.js";

const Router = express.Router();

Router.post("/achievements/rewards/:userId", achievementsRewardsController);

export default Router;
