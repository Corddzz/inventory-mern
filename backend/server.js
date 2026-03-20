import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import inventoryRoutes from "./src/routes/inventoryRoutes.js";
import roomRoutes from "./src/routes/roomRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
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
