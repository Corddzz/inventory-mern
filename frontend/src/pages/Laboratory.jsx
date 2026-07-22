import Button from "../components/Button";
import { Monitor, Plus, Package, Save, X, CloudSnow } from "lucide-react";
import { useState, useEffect } from "react";
import LabCard from "../components/LabCard";
import Card from "../components/Card";
import { createLaboratory, fetchLaboratories } from "../api/axios";
import Modal from "../components/Modal";
import Fieldv2 from "../components/Fieldv2";
import SectionLabel from "../components/SectionLabel";
import Input from "../components/Input";

const Laboratory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [labItem, setLabItem] = useState([]);
  const [formInputs, setFormInputs] = useState({
    lab_name: "",
    building: "",
    floor: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createLaboratory(formInputs);

      const data = await fetchLaboratories();
      setLabItem(data);

      setFormInputs({
        lab_name: "",
        building: "",
        floor: "",
      });

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const loadLaboratory = async () => {
      try {
        const data = await fetchLaboratories();
        console.table(data);
        setLabItem(data);
      } catch (error) {
        console.error("Error fetching laboratory:", error);
      }
    };

    loadLaboratory();
  }, []);
  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-100">
      <div className="bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-base font-bold text-zinc-100">Laboratories</h1>
          <p className="text-xs text-zinc-500 mt-0.5">Laboratory Rooms</p>
        </div>
        <Button title="New Lab" icon={Plus} onClick={openModal} />
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        <div className="flex gap-4">
          <Card label="Total Labs" value={4} valueColor="text-blue-400" />
          <Card label="Active" value={4} valueColor="text-green-400" />
          <Card label="Total Slots" value={4} valueColor="text-amber-400" />
        </div>

        <div className="space-y-4">
          {labItem.map((lab) => (
            <LabCard
              key={lab.id}
              name={lab.name}
              building={lab.building}
              floor={lab.floor}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSubmit}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                <Package className="text-cyan-400" size={16} />
              </div>

              <div>
                <h1 className="text-white font-semibold text-base leading-tight mb-1">
                  Add New Laboratory
                </h1>
                <span className="text-xs text-neutral-500 block">
                  Fields marked with <span className="text-red-400">*</span> are
                  required
                </span>
              </div>

              <button
                className="ml-auto self-start text-zinc-500 hover:text-zinc-100 text-lg leading-none transition-colors"
                onClick={closeModal}
              >
                <X size={18} />
              </button>
            </div>

            <SectionLabel className="mb-3">Laboratory Details</SectionLabel>

            <div className="grid grid-cols-2 space-y-4 gap-3">
              <div className="col-span-2">
                <Fieldv2 label={"Laboratory Name"} required>
                  <Input
                    name="lab_name"
                    type={"text"}
                    required
                    onChange={handleChange}
                    value={formInputs.lab_name}
                  />
                </Fieldv2>
              </div>

              <div className="col-span-1">
                <Fieldv2 label={"Building"} required>
                  <Input
                    name="building"
                    type={"text"}
                    required
                    onChange={handleChange}
                    value={formInputs.building}
                  />
                </Fieldv2>
              </div>

              <div className="col-span-1">
                <Fieldv2 label={"Floor"} required>
                  <Input
                    name="floor"
                    type={"text"}
                    required
                    onChange={handleChange}
                    value={formInputs.floor}
                  />
                </Fieldv2>
              </div>

              <div className="col-span-2 flex justify-end mt-4 gap-3">
                <Button
                  title="Cancel"
                  icon={X}
                  onClick={closeModal}
                  variant={"secondary"}
                  className={"outline-1 hover:bg-zinc-600"}
                />
                <Button title="Save" icon={Save} type="submit" />
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Laboratory;
