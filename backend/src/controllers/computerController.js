import { getAll } from "../models/Computer.js";

export const fetchAll = async (req, res) => {
  try {
    const computers = await getAll();
    res.status(200).json(computers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
