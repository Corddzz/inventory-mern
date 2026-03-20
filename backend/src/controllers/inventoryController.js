import {
  getAll,
  getById,
  insert,
  remove,
  update,
} from "../models/Inventory.js";

export const fetchInventory = async (req, res) => {
  try {
    const inventoryItems = await getAll();
    res.status(200).json(inventoryItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchById = async (req, res) => {
  try {
    const { inventory_id } = req.params;
    const data = await getById(inventory_id);

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

    const newInventoryItem = await insert(
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

export const updateInventory = async (req, res) => {
  try {
    const { inventory_id } = req.params;
    const { inventory_name, cat_name, brand, qty, name, status } = req.body;

    console.log("params:", req.params);
    console.log("body:", req.body);
    console.log("values:", {
      inventory_id,
      inventory_name,
      cat_name,
      brand,
      qty,
      name,
      status,
    });

    const affectedRow = await update(
      inventory_id,
      inventory_name,
      cat_name,
      brand,
      qty,
      name,
      status,
    );

    if (affectedRow === 0) {
      return res.status(404).json({ message: "Item not found! ⚠️" });
    }

    const updatedUser = await getById(inventory_id);
    res.status(200).json({
      success: true,
      message: "Item updated successfully!✅",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteInventory = async (req, res) => {
  try {
    const { inventory_id } = req.params;
    const removedInventory = await remove(inventory_id);

    if (removedInventory.affectedRow === 0)
      return res.status(404).json({ message: "Deleted item not found! ⚠️" });

    res.status(200).json({ message: "Inventory delete successfully! ✅" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
