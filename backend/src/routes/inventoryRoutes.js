import { Router } from "express";
import {
  fetchInventory,
  fetchById,
  createInventory,
  updateInventory,
  deleteInventory,
} from "../controllers/inventoryController.js";

const router = Router();

router.get("/inventory", fetchInventory);
router.get("/inventory/:inventory_id", fetchById);
router.post("/inventory/", createInventory);
router.put("/inventory/:inventory_id", updateInventory);
router.delete("/inventory/:inventory_id", deleteInventory);

export default router;
