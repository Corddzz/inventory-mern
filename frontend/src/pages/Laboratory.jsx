import Button from "../components/Button";
import { Monitor, PlusIcon } from "lucide-react";
import { useState, useEffect } from "react";
import LabCard from "../components/LabCard";
import Card from "../components/Card";
import { fetchLaboratories } from "../api/axios";

const Laboratory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [labItem, setLabItem] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
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
        <Button title="New Lab" icon={PlusIcon} onClick={openModal} />
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
    </div>
  );
};

export default Laboratory;
