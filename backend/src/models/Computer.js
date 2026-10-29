import pool from "../config/connect.js";

export const getAll = async () => {
  const sql = "SELECT * FROM computers";
  const [rows] = await pool.execute(sql);
  return rows;
};
