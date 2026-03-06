import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const fetchInventory = async () => {
  try {
    const response = await axios.get(`${URL}/inventory`);
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory:", error);
  }
};
