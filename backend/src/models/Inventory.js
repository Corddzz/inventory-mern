import pool from "../config/connect.js";

export const getAll = async () => {
  const sql =
    "SELECT inventory.inventory_id, inventory.inventory_name, category.cat_name, inventory.brand, inventory.qty, room.name, inventory.status, DATE_FORMAT(inventory.created_at, '%Y-%m-%d %h:%i:%s %p') AS formatted_date FROM inventory LEFT JOIN category on inventory.category_id = category.cat_id LEFT JOIN room on inventory.room_id = room.room_id ORDER BY formatted_date DESC";
  const [result] = await pool.execute(sql);
  return result;
};

export const getById = async (inventory_id) => {
  const sql =
    "SELECT inventory.inventory_id, inventory.inventory_name, category.cat_name, inventory.brand, inventory.qty, room.name, inventory.status, DATE_FORMAT(inventory.created_at, '%Y-%m-%d %h:%i:%s %p') AS formatted_date FROM inventory LEFT JOIN category on inventory.category_id = category.cat_id LEFT JOIN room on inventory.room_id = room.room_id WHERE inventory_id=?";
  const [result] = await pool.execute(sql, [inventory_id]);
  return result[0];
};

export const insert = async (
  inventory_name,
  cat_name,
  brand,
  qty,
  name,
  status,
) => {
  const sql =
    "INSERT INTO inventory (inventory_name, category_id, brand, qty, room_id, status) values (?, (select cat_id from category where cat_name = ?), ?, ?, (select room_id from room where name = ?), ?);";
  const [result] = await pool.execute(sql, [
    inventory_name,
    cat_name,
    brand,
    qty,
    name,
    status,
  ]);
  return result;
};

export const update = async (
  inventory_id,
  inventory_name,
  cat_name,
  brand,
  qty,
  name,
  status,
) => {
  const sql =
    "UPDATE inventory SET inventory_name = ?, category_id = (select cat_id from category where cat_name = ?), brand = ?, qty = ?, room_id = (select room_id from room where name = ?), status = ? WHERE inventory_id = ?";
  const [result] = await pool.execute(sql, [
    inventory_name,
    cat_name,
    brand,
    qty,
    name,
    status,
    inventory_id,
  ]);
  return result.affectedRows;
};

export const remove = async (inventory_id) => {
  const sql = "Delete from inventory WHERE inventory_id = ?";
  const [result] = await pool.execute(sql, [inventory_id]);

  return result.affectedRows;
};
