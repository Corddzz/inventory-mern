import React from "react";
import { useEffect } from "react";
import { createInventory, fetchInventory } from "../api/axios.js";
import {
  PencilIcon,
  PlusIcon,
  Search,
  Trash2Icon,
  TriangleAlert,
} from "lucide-react";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";
import Modal from "../components/Modal.jsx";
import Field from "../components/Field.jsx";
import Badge from "../components/Badge.jsx";

const Inventory = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [inventoryItems, setInventoryItems] = React.useState([]);
  const [formInputs, setFormInputs] = React.useState({
    inventory_name: "",
    cat_name: "",
    brand: "",
    qty: 1,
    name: "",
    status: "",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const LOW_STOCK_THRESHOLD = 5;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formInputs);

    try {
      await createInventory(formInputs);
      const result = await fetchInventory();
      setInventoryItems(result);
      closeModal();
      setFormInputs({
        inventory_name: "",
        cat_name: "",
        brand: "",
        qty: 1,
        name: "",
        status: "",
      });
    } catch (error) {
      console.error("Error inserting item in the table", error);
    }
  };

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
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-100">
      <div className="bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-base font-bold text-zinc-100">
            General Inventory
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">All Items</p>
        </div>
        <Button title="Add Item" icon={PlusIcon} onClick={openModal} />
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        <div className="flex gap-4">
          <Card
            label="Total Items"
            value={inventoryItems.length}
            valueColor="text-blue-400"
            sub="across all categories"
          />
          <Card
            label="Available"
            value={0}
            valueColor="text-green-400"
            sub="in stock"
          />
          <Card
            label="Assigned"
            value={3}
            valueColor="text-amber-400"
            sub="on computers"
          />
          <Card
            label="Low Stock"
            value={
              inventoryItems.filter((i) => i.qty <= LOW_STOCK_THRESHOLD).length
            }
            valueColor="text-red-400"
            sub={`qty ≤ ${LOW_STOCK_THRESHOLD}`}
          />
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-zinc-100">Item List</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 font-mono">
                {inventoryItems.length} items
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-800 border border-zinc-700 w-56">
              <Search size={14} className="text-zinc-500 shrink-0" />
              <input
                type="text"
                placeholder="Search items..."
                className="bg-transparent text-sm text-zinc-100 placeholder-zinc-600 outline-none w-full"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-max border-collapse table-auto">
              <thead>
                <tr className="border-b border-gray-100">
                  {[
                    "ID",
                    "Name",
                    "Category",
                    "Brand",
                    "Qty",
                    "Room",
                    "Status",
                    "Date Added",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-5 py-3 text-left text-[10px] font-semibold tracking-widest uppercase text-zinc-500"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {inventoryItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-5 py-10 text-center text-sm text-zinc-600"
                    >
                      No items found.
                    </td>
                  </tr>
                ) : (
                  inventoryItems.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b border-zinc-800/60 transition-colors hover:bg-zinc-800/40
                        ${index % 2 !== 0 ? "bg-zinc-800/20" : ""}`}
                    >
                      <td className="px-5 py-4 text-xs text-zinc-500 font-mono">
                        {item.inventory_id}
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-zinc-100">
                          {item.inventory_name}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <Badge category={item.cat_name} />
                      </td>
                      <td className="px-5 py-4 text-sm text-zinc-400">
                        {item.brand}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-sm font-bold ${item.qty <= LOW_STOCK_THRESHOLD ? "text-amber-400" : "text-zinc-100"}`}
                          >
                            {item.qty}
                          </span>
                          {item.qty <= LOW_STOCK_THRESHOLD && (
                            <TriangleAlert
                              size={13}
                              className="text-amber-400"
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-zinc-400">
                        {item.name}
                      </td>

                      <td className="px-5 py-4 text-sm text-zinc-400">
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1.5 text-xs text-green-400 font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                            {item.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs text-zinc-500 font-mono">
                        {item.formatted_date}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-sky-500/10 hover:text-sky-400 transition-colors">
                            <PencilIcon size={14} />
                          </button>
                          <button className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
                            <Trash2Icon size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold text-zinc-100">
                📦 Add New Item
              </h2>
              <button
                className="text-zinc-500 hover:text-zinc-100 text-lg leading-none transition-colors"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Field label="Item Name">
                  <input
                    name="inventory_name"
                    type="text"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm placeholder-zinc-600 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                    required
                    value={formInputs.inventory_name}
                    onChange={handleChange}
                  />
                </Field>
              </div>
              <Field label="Category">
                <select
                  name="cat_name"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm placeholder-zinc-600 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                  required
                  value={formInputs.cat_name}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="Equipment">Equipment</option>
                  <option value="Tools">Tools</option>
                  <option value="Consumables">Consumables</option>
                </select>
              </Field>
              <Field label="Brand">
                <input
                  name="brand"
                  type="text"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm placeholder-zinc-600 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                  required
                  value={formInputs.brand}
                  onChange={handleChange}
                />
              </Field>
              <Field label="Quantity">
                <input
                  name="qty"
                  type="number"
                  min={1}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm placeholder-zinc-600 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                  required
                  value={formInputs.qty}
                  onChange={handleChange}
                />
              </Field>
              <Field label="Room">
                <select
                  name="name"
                  className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm placeholder-zinc-600 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                  required
                  value={formInputs.name}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select Room
                  </option>
                  <option value="IT Dept">IT Dept</option>
                  <option value="Elem Dept">Elem Dept</option>
                  <option value="HS Dept">HS Dept</option>
                  <option value="SHS Dept">SHS Dept</option>
                  <option value="College Dept">College Dept</option>
                </select>
              </Field>
              <div className="col-span-2">
                <Field label="Status">
                  <select
                    name="status"
                    className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 text-sm placeholder-zinc-600 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                    required
                    value={formInputs.status}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="Good">Good</option>
                    <option value="Defective">Defective</option>
                  </select>
                </Field>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
              >
                💾 Save Item
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Inventory;
