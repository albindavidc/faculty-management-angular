import dotenv from "dotenv";
import db from "./config/database.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import adminRoutes from "./Routes/AdminRoutes.js";

dotenv.config();
db();
const app = express();

app.use(express.json());
// app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use("/admin", adminRoutes);

export default app;
