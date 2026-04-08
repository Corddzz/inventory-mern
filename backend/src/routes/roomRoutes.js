import { Router } from "express";
import { fetchAll } from "../controllers/roomController.js";

const router = Router();

router.get("/rooms", fetchAll);

export default router;
