import {
  getAll,
  getById,
  insert,
  update,
  remove,
} from "../models/Laboratory.js";

export const fetchAll = async (req, res) => {
  try {
    const rooms = await getAll();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchById = async (req, res) => {
  const { lab_id } = req.params;
  try {
    const data = await getById(lab_id);

    if (!data) {
      return res.status(404).json({ message: "Laboratory not found!⚠️" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createLaboratory = async (req, res) => {
  const { lab_name, building, floor } = req.body;
  try {
    const result = await insert(lab_name, building, floor);
    res.status(201).json({
      message: "Laboratory created successfully ✅",
      data: { lab_name, building, floor },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateLaboratory = async (req, res) => {
  const { lab_id } = req.params;
  const { lab_name, building, floor } = req.body;
  try {
    const result = await update(lab_id, lab_name, building, floor);
    res.status(200).json({
      message: "Laboratory updated successfully ✅",
      data: { lab_id, lab_name, building, floor },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteLaboratory = async (req, res) => {
  const { lab_id } = req.params;
  try {
    const result = await remove(lab_id);
    res.status(200).json({
      message: "Laboratory deleted successfully ✅",
      lab_id: lab_id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
