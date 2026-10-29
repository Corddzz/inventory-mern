import React, { useEffect, useState } from "react";
import { PlusIcon, Search } from "lucide-react";
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

  const filteredComputers = computers.filter((computer) => {
    const query = search.trim().toLowerCase();
    return (
      String(computer.name ?? "")
        .toLowerCase()
        .includes(query) ||
      String(computer.status ?? "")
        .toLowerCase()
        .includes(query)
    );
  });

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-100">
      <div className="bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-base font-bold text-zinc-100">Computers</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Computer component assignments
          </p>
        </div>
        <Button title="Assign Component" icon={PlusIcon} />
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-zinc-100">
                Computers
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 font-mono">
                {computers.length} total
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-800 border border-zinc-700 w-56">
              <Search size={14} className="text-zinc-500 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search computers..."
                aria-label="Search computers"
                className="bg-transparent text-sm text-zinc-100 placeholder-zinc-600 outline-none w-full"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-max border-collapse">
              <thead>
                <tr className="border-b border-zinc-800">
                  {["Computer Name", "Status", "Created At"].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-[10px] font-semibold tracking-widest uppercase text-zinc-500"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center text-sm text-zinc-500">
                      Loading computers...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center text-sm text-red-400">
                      {error}
                    </td>
                  </tr>
                ) : filteredComputers.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center text-sm text-zinc-500">
                      {search ? "No matching computers found." : "No computers found."}
                    </td>
                  </tr>
                ) : (
                  filteredComputers.map((computer, idx) => (
                    <tr
                      key={computer.id}
                      className={`border-b border-zinc-800/60 transition-colors hover:bg-zinc-800/40
                        ${idx % 2 !== 0 ? "bg-zinc-800/20" : ""}`}
                    >
                      <td className="px-6 py-4 text-sm font-bold text-zinc-100">
                        {computer.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-300">
                        {computer.status ?? "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-400">
                        {computer.created_at ?? "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Computer;
