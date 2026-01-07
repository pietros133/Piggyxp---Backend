import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./src/config/dbconnect.js";
import registerRoutes from "./src/routes/registerRoutes.js";
import uploadRoutes from "./src/routes/userImgRoutes.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Rotas
app.use("/api", registerRoutes);
app.use("/api", uploadRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado !");

    app.listen(PORT, () => {
      console.log("Aplicação iniciada na porta " + PORT);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar no banco: " + err);
  });
