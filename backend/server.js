import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import inventoryRoutes from "./src/routes/inventoryRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from './src/routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));

app.get("/", (req, res) => {
  console.log("Hello World!");
  res.send("Hello World!");
});

// Routes
app.use("/", inventoryRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
