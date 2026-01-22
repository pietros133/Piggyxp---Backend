import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import express from "express";
import cors from "cors";
import path from "path";

import { AppDataSource } from "./src/config/dbconnect.js";

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

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar no banco:", err);
  });

export default app;
