import React, { useEffect, useState } from "react";
import { Monitor, PlusIcon, Search } from "lucide-react";
import Button from "../components/Button.jsx";
import { fetchComputer } from "../api/axios.js";

const Computer = () => {
  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadComputers = async () => {
      try {
        const data = await fetchComputer();
        if (!Array.isArray(data)) {
          throw new Error("The computers API returned an invalid response.");
        }
        setComputers(data);
      } catch (error) {
        console.error("Error fetching computers:", error);
        setError("Could not load computers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadComputers();
  }, []);

  return (
    <div className="flex h-full flex-col bg-zinc-950 text-zinc-100">
      // TODO: create navbar component and integrate to layout
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-6 py-4">
        <div>
          <h1 className="text-base font-bold text-zinc-100">Computers</h1>
          <p className="mt-0.5 text-xs text-zinc-500">
            Computer component assignments
          </p>
        </div>
        <Button title="Assign Component" icon={PlusIcon} />
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col gap-6">
          <div className="w-full rounded border-dashed border-2 border-zinc-600 p-4 text-center">
            <p className="text-zinc-600 font-mono text-lg font-semibold">
              Teacher's Table
            </p>
          </div>

          {/* Container */}
          <div className="flex-1 rounded bg-cyan-400/20 p-4">
            <Monitor size={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Computer;
