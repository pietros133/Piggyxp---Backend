import "reflect-metadata";
import { DataSource } from "typeorm"; 
import dotenv from "dotenv"; 
import { Phases } from "../models/Phases.js"; 
dotenv.config(); 

export const MongoDataSource = new DataSource({ 
    type: "mongodb",
    url: process.env.MONGO_URL,
    logging: true,
       
    entities: [Phases]
 });