import express from "express";
import bodyParser from "body-parser";
import carRouter from "../config/carRoutes";
import knex from "knex";
import { Model } from "objection";
import userRoutes from "../config/userRoutes";
import cors from "cors";
import knexConfig from "../knexfile";

export const app = express();
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import YAML from "yaml";
const file = fs.readFileSync("./openapi.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const knexInstance = knex(knexConfig.production);
Model.knex(knexInstance);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/cars", carRouter);
app.use("/api/v1/users", userRoutes);

export default app;
