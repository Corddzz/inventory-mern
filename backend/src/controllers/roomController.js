import { getAll } from "../models/Room.js";

export const fetchAll = async (req, res) => {
  try {
    const rooms = await getAll();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
