import { Router } from "express";
import {
  fetchInventory,
  fetchById,
  createInventory,
} from "../controllers/inventoryController.js";

const router = Router();

router.get("/inventory", fetchInventory);
router.get("/inventory/:id", fetchById);
router.post("/inventory/", createInventory);

export default router;
