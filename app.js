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

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", registerRoutes);
app.use("/api", uploadRoutes);
app.use("/api", infoRoutes);

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
