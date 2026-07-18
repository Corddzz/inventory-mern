import { Router } from "express";
import {
  fetchAll,
  fetchById,
  createLaboratory,
  updateLaboratory,
  deleteLaboratory,
} from "../controllers/laboratoryController.js";

const router = Router();

router.get("/laboratory", fetchAll);
router.get("/laboratory/:lab_id", fetchById);
router.post("/laboratory", createLaboratory);
router.put("/laboratory/:lab_id", updateLaboratory);
router.delete("/laboratory/:lab_id", deleteLaboratory);

export default router;
