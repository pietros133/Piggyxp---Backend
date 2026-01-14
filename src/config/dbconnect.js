import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../models/User.js";
import { UserProgress } from "../models/UserProgress.js";
import { RefreshToken } from "../models/RefreshToken.js";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  synchronize: false,
  logging: false,

  entities: [User, UserProgress, RefreshToken],
  migrations: ["src/migrations/*.cjs"],
});
