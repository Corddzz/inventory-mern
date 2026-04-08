import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import inventoryRoutes from "./src/routes/inventoryRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  console.log("Hello World!");
  res.send("Hello World!");
});

// Middlware
app.use("/", inventoryRoutes);
app.use("/", roomRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
