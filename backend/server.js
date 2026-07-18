import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import inventoryRoutes from "./src/routes/inventoryRoutes.js";
import laboratoryRoutes from "./src/routes/laboratoryRoutes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.get("/", (req, res) => res.json({ message: "LabTrack API running 🚀" }));

app.use("/", inventoryRoutes);
app.use("/", laboratoryRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
