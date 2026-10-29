import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import inventoryRoutes from "./src/routes/inventoryRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import computerRoutes from "./src/routes/computerRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const CORS = process.env.CORS_ORIGIN;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
console.log("CORS Origin from env:", process.env.CORS_ORIGIN);
app.use(cors({ origin: CORS, credentials: true }));

app.get("/", (req, res) => {
  console.log("Hello World!");
  res.send("Hello World!");
});

app.use("/", inventoryRoutes);
app.use("/", authRoutes);
app.use("/", computerRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
