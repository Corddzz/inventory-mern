import pool from "../config/connect.js";

export const getAllInventory = async () => {
  const [result] = await pool.query("SELECT * FROM inventory");
  return result;
};

export const getById = async (id) => {
  const [result] = await pool.query("SELECT * FROM inventory WHERE id=?", [id]);
  return result[0];
};
