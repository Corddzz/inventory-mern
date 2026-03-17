import {
  getAllInventory,
  getById,
  insertInventory,
} from "../models/Inventory.js";

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

export const createInventory = async (req, res) => {
  try {
    const { inventory_name, cat_name, brand, qty, name, status } = req.body;
    console.log("req.body:", req.body);
    console.log("cat_name:", cat_name);
    if (
      !inventory_name ||
      !cat_name ||
      !brand ||
      qty == null ||
      !name ||
      !status
    )
      return res.status(400).json({ error: "Missing required fields! ⚠️" });

    const newInventoryItem = await insertInventory(
      inventory_name,
      cat_name,
      brand,
      qty,
      name,
      status,
    );

    res.status(201).json({
      message: "Item inserted successfully ✅",
      item: newInventoryItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
