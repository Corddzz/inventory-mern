import { Router } from "express";
import { fetchAll } from "../controllers/computerController.js";

const router = Router();

router.get("/computers", fetchAll);
export default router;
