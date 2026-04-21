import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import express from "express";
import cors from "cors";
import path from "path";
// import swaggerUi from "swagger-ui-express";
// import swaggerSpec from "./src/config/swagger.js";
import { AppDataSource } from "./src/config/dbconnect.js";
import { MongoDataSource } from "./src/mongo/database/mdbconnect.js";
import { swaggerDocs } from "./src/config/swagger.js";

// Rotas
import registerRoutes from "./src/routes/registerRoutes.js";
import uploadRoutes from "./src/routes/userImgRoutes.js";
import infoRoutes from "./src/routes/getUserInfoRoutes.js";
import loginRoutes from "./src/routes/loginRoutes.js";
import recoveryRoutes from "./src/routes/recoveryRoutes.js";
import refreshToken from "./src/routes/refreshTokenRoutes.js";
import difficultySelection from "./src/routes/difficultySelectionRoutes.js";
import progressInfo from "./src/routes/getUserProgressInfoRoutes.js";
import updateUser from "./src/routes/updateUserRoute.js";
import updateImg from "./src/routes/updateImgRoute.js";
import deleteUser from "./src/routes/deleteUserRoute.js";
import getPhases from "./src/routes/getPhaseRoute.js";
import phasesRoutes from "./src/routes/PhasesRoute.js";
import getRanking from "./src/routes/RankingRoutes.js";
import titlesRoute from "./src/routes/TitlesRoute.js";
import getTitleRoute from "./src/routes/getTitlesRoute.js";
import achievementsRoutes from "./src/routes/achievementsRoute.js";
import finishRoute from "./src/routes/FinishPhaseRoute.js";
import regenRoute from "./src/routes/regenLivesRoute.js";
import missionRoute from "./src/routes/MissionRoute.js";
import selectMissionRoute from "./src/routes/selectMissionRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", registerRoutes);
app.use("/api", uploadRoutes);
app.use("/api", infoRoutes);
app.use("/api", loginRoutes);
app.use("/api", recoveryRoutes);
app.use("/api", refreshToken);
app.use("/api", difficultySelection);
app.use("/api", progressInfo);
app.use("/api", updateUser);
app.use("/api", updateImg);
app.use("/api", deleteUser);
app.use("/api", getPhases);
app.use("/api", phasesRoutes);
app.use("/api", getRanking);
app.use("/api", titlesRoute);
app.use("/api", getTitleRoute);
app.use("/api", achievementsRoutes);
app.use("/api", finishRoute);
app.use("/api", regenRoute);
app.use("/api", missionRoute);
app.use("/api", selectMissionRoute);

// Swagger
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
swaggerDocs(app);

async function startServer() {
  try {
    AppDataSource.initialize().then(() => {
      console.log("Banco SQL conectado");
    });

    MongoDataSource.initialize().then(() => {
      console.log("MongoDB conectado");
    });

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error("Erro ao conectar nos bancos:", err);
  }
}

startServer();

export default app;
