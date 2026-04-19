import { Router } from "express";
import { getMe, login, logout, signUp } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.get("/me", verifyToken, getMe);

export default router;
