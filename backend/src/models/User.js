import pool from "../config/connect.js";

export const getAll = async () => {
  const sql = "SELECT id, email, role FROM users";
  const [result] = await pool.execute(sql);
  return result;
};

export const findById = async (id) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  const [rows] = await pool.execute(sql, [id]);
  return rows[0];
};

export const findByEmail = async (email) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const [rows] = await pool.execute(sql, [email]);
  return rows[0];
};

export const insert = async (email, password) => {
  const [result] = await pool.execute(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password],
  );
  return result;
};

export const update = async (id, email) => {
  const sql = "UPDATE users SET email = ? WHERE id =?";
  const [result] = await pool.execute(sql, [email, id]);
  return result;
};

export const remove = async (id) => {
  const sql = "DELETE FROM users WHERE id = ?";
  const [result] = await pool.execute(sql, [id]);
  return result;
};
