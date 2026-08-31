import { Router } from "express";
import {
  fetchInventory,
  fetchById,
  createInventory,
  updateInventory,
  deleteInventory,
} from "../controllers/inventoryController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/inventory", verifyToken, fetchInventory);
router.get("/inventory/:inventory_id", verifyToken, fetchById);
router.post("/inventory/", verifyToken, createInventory);
router.put("/inventory/:inventory_id", verifyToken, updateInventory);
router.delete("/inventory/:inventory_id", verifyToken, deleteInventory);

export default router;
