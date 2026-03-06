import React from "react";
import { useEffect } from "react";
import { fetchInventory } from "../api/axios.js";
import { CirclePlus, PencilIcon, Trash2Icon } from "lucide-react";

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [inventoryItems, setInventoryItems] = React.useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const data = await fetchInventory();
        console.table(data);
        setInventoryItems(data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    loadInventory();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">📦 Inventory</h1>
        <button
          className="btn btn-accent flex items-center gap-2"
          onClick={openModal}
        >
          <CirclePlus />
          <span>New Item</span>
        </button>
      </div>

      <div className="divider"></div>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table table-zebra">
          <thead className="bg-base-200 text-base">
            <tr>
              <th>
                <input type="checkbox" className="checkbox checkbox-accent" />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Date Added</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item) => (
              <tr key={item.id} className="hover:bg-base-300">
                <th>
                  <input type="checkbox" className="checkbox checkbox-accent" />
                </th>
                <th>{item.id}</th>
                <td>{item.item_name}</td>
                <td>{item.category}</td>
                <td>{item.brand}</td>
                <td>{item.quantity}</td>
                <td>{item.location}</td>
                <td>{item.created_at}</td>
                <td className="flex gap-2 justify-center">
                  <button className="btn btn-square btn-info">
                    <PencilIcon />
                  </button>
                  <button className="btn btn-square btn-error">
                    <Trash2Icon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open transition-all ease-in-out duration-500">
          <div className="modal-box max-w-lg p-9 rounded-lg shadow-xl bg-base-300">
            <h2 className="text-2xl font-semibold text-center mb-6">
              🖥️ New Item
            </h2>

            <form className="space-y-6">
              {/* Item Information */}

              <div className="grid grid-cols-1 gap-4">
                {/* Item Name */}
                <div className="form-control">
                  <label className="label font-medium mb-2">Item Name</label>
                  <input
                    type="text"
                    placeholder="Dell Desktop"
                    className="input input-bordered input-accent w-full focus:ring-1 focus:ring-accent transition-all rounded-md shadow-sm"
                    required
                  />
                </div>

                {/* Category */}
                <div className="form-control">
                  <label className="label font-medium mb-2">Category</label>
                  <select
                    className="select select-accent w-full focus:ring-1 focus:ring-accent transition-all rounded-md shadow-sm"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option>Consumables</option>
                    <option>Equipment</option>
                    <option>Tools</option>
                  </select>
                </div>

                {/* Brand */}
                <div className="form-control">
                  <label className="label font-medium mb-2">Brand</label>
                  <input
                    type="text"
                    placeholder="Dell OptiPlex 7090"
                    className="input input-bordered input-accent w-full focus:ring-1 focus:ring-accent transition-all rounded-md shadow-sm"
                  />
                </div>

                {/* Quantity */}
                <div className="form-control">
                  <label className="label font-medium mb-2">Quantity</label>
                  <input
                    type="number"
                    defaultValue={1}
                    min={1}
                    className="input input-bordered input-accent w-full focus:ring-1 focus:ring-accent transition-all rounded-md shadow-sm"
                    placeholder="Quantity"
                  />
                </div>

                {/* Location */}
                <div className="form-control">
                  <label className="label font-medium mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="IT Office / Lab 1"
                    className="input input-bordered input-accent w-full focus:ring-1 focus:ring-accent transition-all rounded-md shadow-sm"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  className="btn btn-ghost hover:bg-gray-100 hover:scale-105 transition-all rounded-md shadow-sm"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary text-white hover:bg-primary-focus transition-all rounded-md shadow-sm"
                >
                  💾 Save Item
                </button>
              </div>
            </form>

            {/* Close button */}
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={closeModal}
              >
                ✕
              </button>
            </form>
          </div>

          {/* Modal Backdrop */}
          <div className="modal-backdrop ">
            <button onClick={closeModal} className="w-full h-full"></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
