import { Router } from "express";
import {
  fetchInventory,
  fetchById,
} from "../controllers/inventoryController.js";

const router = Router();

router.get("/inventory", fetchInventory);
router.get("/inventory/:id", fetchById);

export default router;
