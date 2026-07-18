import pool from "../config/db.js";

export const getAll = async () => {
  const sql = "SELECT * FROM laboratories";
  const [result] = await pool.execute(sql);
  return result;
};

export const getById = async (id) => {
  const sql = "SELECT * FROM laboratories WHERE id = ?";
  const [result] = await pool.execute(sql, [id]);
  return result[0];
};

export const insert = async (lab_name, building, floor) => {
  const sql =
    "INSERT INTO laboratories (name, building, floor) VALUES (?, ?, ?)";
  const [result] = await pool.execute(sql, [lab_name, building, floor]);
  return result;
};

export const update = async (lab_id, lab_name, building, floor) => {
  const sql =
    "UPDATE laboratories SET name = ?, building = ?, floor = ? WHERE id = ?";
  const [result] = await pool.execute(sql, [lab_name, building, floor, lab_id]);
  return result;
};

export const remove = async (lab_id) => {
  const sql = "DELETE FROM laboratories WHERE id = ?";
  const [result] = await pool.execute(sql, [lab_id]);
  return result;
};
