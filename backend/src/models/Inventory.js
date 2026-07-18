import pool from "../config/db.js";

export const getAll = async () => {
  const sql = `SELECT 
    inventory_items.id, 
    inventory_items.name AS inventory_name, 
    categories.name AS category_name,
    brands.name AS brand_name, 
    inventory_items.qty, 
    laboratories.name AS laboratory_name, 
    inventory_items.status, 
    DATE_FORMAT(inventory_items.created_at, '%Y-%m-%d %h:%i:%s %p') AS formatted_date
    FROM inventory_items 
    LEFT JOIN categories ON inventory_items.category_id = categories.id 
    LEFT JOIN brands ON inventory_items.brand_id = brands.id 
    LEFT JOIN laboratories ON inventory_items.laboratory_id = laboratories.id 
    ORDER BY inventory_items.id DESC;`;
  const [rows] = await pool.execute(sql);
  return rows;
};

export const getById = async (inventory_id) => {
  const sql = `SELECT 
    inventory_items.id, 
    inventory_items.name AS inventory_name, 
    categories.name AS category_name,
    brands.name AS brand_name, 
    inventory_items.qty, 
    laboratories.name AS laboratory_name, 
    inventory_items.status, 
    DATE_FORMAT(inventory_items.created_at, '%Y-%m-%d %h:%i:%s %p') AS formatted_date
    FROM inventory_items 
    LEFT JOIN categories ON inventory_items.category_id = categories.id 
    LEFT JOIN brands ON inventory_items.brand_id = brands.id 
    LEFT JOIN laboratories ON inventory_items.laboratory_id = laboratories.id 
    WHERE inventory_items.id = ?;`;
  const [rows] = await pool.execute(sql, [inventory_id]);
  return rows[0];
};

export const insert = async (
  inventory_name,
  cat_name,
  brand_name,
  qty,
  lab_name,
  status,
) => {
  const sql = `INSERT INTO inventory_items (
    name, 
    category_id, 
    brand_id, 
    qty, 
    laboratory_id, 
    status
    ) VALUES (
    ?, 
    (SELECT id FROM categories WHERE name = ?), 
    (SELECT id FROM brands WHERE name = ?), 
    ?, 
    (SELECT id FROM laboratories WHERE name = ?), 
    ?
    );`;
  const [result] = await pool.execute(sql, [
    inventory_name,
    cat_name,
    brand_name,
    qty,
    lab_name,
    status,
  ]);
  return result;
};

export const update = async (
  inventory_id,
  inventory_name,
  cat_name,
  brand_name,
  qty,
  lab_name,
  status,
) => {
  const sql = `UPDATE inventory_items 
    SET 
    name = ?, 
    category_id = (SELECT id FROM categories WHERE name = ?), 
    brand_id = (SELECT id FROM brands WHERE name = ?), 
    qty = ?, 
    laboratory_id = (SELECT id FROM laboratories WHERE name = ?), 
    status = ? 
    WHERE id = ?;`;
  const [result] = await pool.execute(sql, [
    inventory_name,
    cat_name,
    brand_name,
    qty,
    lab_name,
    status,
    inventory_id,
  ]);
  return result.affectedRows;
};

export const remove = async (inventory_id) => {
  const sql = `DELETE FROM inventory_items WHERE id = ?`;
  const [result] = await pool.execute(sql, [inventory_id]);

  return result.affectedRows;
};
