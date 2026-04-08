import pool from "../config/connect.js";

export const getAll = async () => {
  const sql = "SELECT * FROM room";
  const [result] = await pool.query(sql);
  return result;
};
