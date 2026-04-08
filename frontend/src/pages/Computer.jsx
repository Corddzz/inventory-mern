import React, { useState } from "react";
import { Trash2Icon, PlusIcon, Package, Search } from "lucide-react";
import Button from "../components/Button.jsx";
import Card from "../components/Card.jsx";

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const mockComponents = [
  {
    id: 1,
    computer: "PC-01",
    component: "RAM",
    specValue: "DDR4 8GB RAM",
    source: "inventory",
    condition: "Good",
  },
  {
    id: 2,
    computer: "PC-01",
    component: "CPU",
    specValue: "Intel Core i5-12400",
    source: "inventory",
    condition: "Good",
  },
  {
    id: 3,
    computer: "PC-01",
    component: "Storage",
    specValue: "500GB SSD",
    source: "inventory",
    condition: "Good",
  },
  {
    id: 4,
    computer: "PC-02",
    component: "RAM",
    specValue: "DDR4 16GB RAM",
    source: "manual",
    condition: "Good",
  },
  {
    id: 5,
    computer: "PC-03",
    component: "CPU",
    specValue: "Intel Core i3-10100",
    source: "manual",
    condition: "Defective",
  },
  {
    id: 6,
    computer: "CL2-02",
    component: "CPU",
    specValue: "AMD Ryzen 5",
    source: "manual",
    condition: "Good",
  },
];

// ─── Component Type Badge ──────────────────────────────────────────────────────
const ComponentBadge = ({ type }) => {
  const colors = {
    RAM: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    CPU: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
    Storage: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    GPU: "bg-green-500/10 text-green-400 border border-green-500/20",
  };
  return (
    <span
      className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg uppercase tracking-wide ${colors[type] ?? "bg-zinc-700 text-zinc-300"}`}
    >
      {type}
    </span>
  );
};

// ─── Condition Badge ───────────────────────────────────────────────────────────
const ConditionBadge = ({ condition }) => {
  const colors = {
    Good: "bg-green-500/10 text-green-400 border border-green-500/20",
    Defective: "bg-red-500/10 text-red-400 border border-red-500/20",
  };
  return (
    <span
      className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${colors[condition] ?? "bg-zinc-700 text-zinc-300"}`}
    >
      {condition}
    </span>
  );
};

// ─── Source Cell ───────────────────────────────────────────────────────────────
const SourceCell = ({ source }) => {
  if (source === "inventory") {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 w-fit">
        <Package size={13} className="text-cyan-400" />
        <span className="text-xs font-semibold text-cyan-400">Inventory</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <span className="text-amber-400 text-sm">✏</span>
      <span className="text-sm text-zinc-400">Manual</span>
    </div>
  );
};

// ─── Computer Page ─────────────────────────────────────────────────────────────
const Computer = () => {
  const [components] = useState(mockComponents);

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
        {/* ── Summary Cards ── */}
        {/* <div className="flex gap-4">
          <Card
            label="Total Components"
            value={components.length}
            valueColor="text-blue-400"
            sub="assigned across all PCs"
          />
          <Card
            label="Total Computers"
            value={[...new Set(components.map((c) => c.computer))].length}
            valueColor="text-cyan-400"
            sub="unique PCs with components"
          />
          <Card
            label="From Inventory"
            value={components.filter((c) => c.source === "inventory").length}
            valueColor="text-violet-400"
            sub="linked from inventory"
          />
          <Card
            label="Defective"
            value={components.filter((c) => c.condition === "Defective").length}
            valueColor="text-red-400"
            sub="components needing attention"
          />
        </div> */}

        {/* ── Components Table Panel ── */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          {/* Panel Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-zinc-100">
                Computer Components
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 font-mono">
                {components.length} assigned
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
            <table className="w-full min-w-max border-collapse">
              <thead>
                <tr className="border-b border-zinc-800">
                  {["Computer Name", "Source", "Condition"].map((header) => (
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
                {components.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`border-b border-zinc-800/60 transition-colors hover:bg-zinc-800/40
                      ${idx % 2 !== 0 ? "bg-zinc-800/20" : ""}`}
                  >
                    <td className="px-6 py-4 text-sm font-bold text-zinc-100">
                      {row.computer}
                    </td>

                    <td className="px-6 py-4">
                      <SourceCell source={row.source} />
                    </td>

                    <td className="px-6 py-4">
                      <ConditionBadge condition={row.condition} />
                    </td>

                    {/* <td className="px-6 py-4">
                      <button className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
                        <Trash2Icon size={14} />
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Computer;
