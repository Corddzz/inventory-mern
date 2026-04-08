import pool from "../config/connect.js";

export const findByEmail = async (email) => {
  const sql = "SELECT * FROM users WHERE email = ?";

  const [rows] = await pool.execute(sql, [email]);
  return rows[0];
};

export const insert = async (email, password) => {
  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";

  const [result] = await pool.execute(sql, [email, password]);
  return result;
};

export const remove = async (id) => {
  const sql = "DELETE FROM users WHERE id = ?";
  const [result] = await pool.execute(sql, [id]);
  return result;
};
