import { getAll, update, remove, findById } from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await getAll();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const users = await findById(id);
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    await update(id, email);
    res.status(200).json({ message: "User updated successfully ✅" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await remove(id);
    res.status(200).json({ message: "User deleted successfully ✅" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};