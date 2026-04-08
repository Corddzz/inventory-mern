import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

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
