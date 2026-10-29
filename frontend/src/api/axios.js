import axios from "axios";

const URL = import.meta.env.VITE_API_URL || "http://localhost:9000";

// Backend sets the JWT as an httpOnly cookie, so every request needs to
// carry credentials for the browser to send/receive it (frontend and
// backend run on different ports, i.e. different origins in dev).
axios.defaults.withCredentials = true;

export const signupUser = async (email, password, role = "user") => {
  try {
    const { data } = await axios.post(`${URL}/signup`, {
      email,
      password,
      role,
    });
    return data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const { data } = await axios.post(`${URL}/login`, { email, password });
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const { data } = await axios.get(`${URL}/me`);
    return data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const { data } = await axios.post(`${URL}/logout`);
    return data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const fetchInventory = async () => {
  try {
    const response = await axios.get(`${URL}/inventory`);
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    throw error;
  }
};

export const fetchInventoryById = async (id) => {
  try {
    const response = await axios.get(`${URL}/inventory/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    throw error;
  }
};

export const createInventory = async (item) => {
  try {
    const { data } = await axios.post(`${URL}/inventory`, item);
    return data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

export const updateInventory = async (item) => {
  try {
    const { data } = await axios.put(
      `${URL}/inventory/${item.inventory_id}`,
      item,
    );
    return data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

export const deleteInventory = async (inventory_id) => {
  try {
    const { data } = await axios.delete(`${URL}/inventory/${inventory_id}`);
    return data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

export const fetchRoom = async () => {
  try {
    const { data } = await axios.get(`${URL}/rooms`);
    return data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export const fetchComputer = async () => {
  try {
    const { data } = await axios.get(`${URL}/computers`);
    return data;
  } catch (error) {
    console.error("Error fetching computers:", error);
    throw error;
  }
};
