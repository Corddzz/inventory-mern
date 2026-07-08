import pool from "../config/db.js";

export const getAll = async () => {
  const sql = "SELECT * FROM room";
  const [result] = await pool.query(sql);
  return result;
};
