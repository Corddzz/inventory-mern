import pool from "../config/connect.js";

export const getAllInventory = async () => {
  const sql =
    "SELECT inventory.inventory_id, inventory.inventory_name, category.cat_name, inventory.brand, inventory.qty, room.name, inventory.status, DATE_FORMAT(inventory.created_at, '%Y-%m-%d %h:%i:%s %p') AS formatted_date from inventory left join category on inventory.category_id = category.cat_id left join room on inventory.room_id = room.room_id ORDER BY formatted_date DESC";
  const [result] = await pool.execute(sql);
  return result;
};

export const getById = async (id) => {
  const sql = "SELECT * FROM inventory WHERE inventory_id=?";
  const [result] = await pool.execute(sql, [id]);
  return result[0];
};

export const insertInventory = async (
  inventory_name,
  cat_name,
  brand,
  qty,
  room_id,
  status,
) => {
  const sql =
    "INSERT INTO inventory (inventory_name, category_id, brand, qty, room_id, status) values (?, (select cat_id from category where cat_name = ?), ?, ?, (select room_id from room where name = ?), ?);";
  const [result] = await pool.execute(sql, [
    inventory_name,
    cat_name,
    brand,
    qty,
    room_id,
    status,
  ]);
  return result;
};
