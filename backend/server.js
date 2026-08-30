import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import inventoryRoutes from "./src/routes/inventoryRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT;
const corsOrigin = process.env.CORS_ORIGIN;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
console.log("CORS Origin from env:", process.env.CORS_ORIGIN);
app.use(cors({ origin: corsOrigin, credentials: true }));

app.get("/", (req, res) => {
  console.log("Hello World!");
  res.send("Hello World!");
});

app.use("/", inventoryRoutes);
app.use("/", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));