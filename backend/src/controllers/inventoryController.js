import { getAllInventory, getById } from "../models/Inventory.js";

export const fetchInventory = async (req, res) => {
  try {
    const inventoryItems = await getAllInventory();
    res.status(200).json(inventoryItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getById(id);

    if (!data) {
      return res.status(404).json({ message: "Item not found!⚠️" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
