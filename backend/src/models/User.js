import pool from "../config/connect.js";

export const findByEmail = async (email) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  const [result] = await pool.execute(sql, [
    email,
  ]);
  return result[0];
};

export const insert = async (email, password) => {
  const [result] = await pool.execute(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password],
  );
  return result;
};

export const getAll = async () => {
  const sql = "SELECT id, email FROM users";
  const [result] = await pool.execute(sql);
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