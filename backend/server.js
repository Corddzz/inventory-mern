import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import inventoryRoutes from "./src/routes/inventoryRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.get("/", (req, res) => {
  console.log("Hello World!");
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log({ email: email, password: hashedPassword });
  } catch (error) {
    console.error({ message: error });
    throw error;
  }
});

app.use("/", inventoryRoutes);
app.use("/", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
