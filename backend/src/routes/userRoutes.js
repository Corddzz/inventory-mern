import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser);

export default router;
