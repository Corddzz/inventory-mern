import { Router } from "express";
import { login, signUp, getMe, logoutUser } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/me", verifyToken, getMe);
router.post("/logout", logoutUser);

export default router;