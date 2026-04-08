import { useState } from "react";
import { Monitor, Plus } from "lucide-react";

const ROWS = 5;
const COLS = 6;

const computers = [
  {
    id: "PC-01",
    status: "has-specs",
    specs: 3,
    row: 0,
    col: 0,
    cpu: "Intel i5-10400",
    ram: "8GB DDR4",
    storage: "256GB SSD",
    os: "Windows 11",
    added: "Jan 2024",
  },
  {
    id: "PC-02",
    status: "has-specs",
    specs: 1,
    row: 0,
    col: 1,
    cpu: "Intel i3-9100",
    ram: "4GB DDR4",
    storage: "128GB SSD",
    os: "Windows 10",
    added: "Mar 2023",
  },
  {
    id: "PC-03",
    status: "defective",
    specs: 1,
    row: 0,
    col: 2,
    cpu: "AMD Ryzen 3",
    ram: "4GB DDR4",
    storage: "128GB HDD",
    os: "Windows 10",
    added: "Feb 2022",
    issue: "Display failure",
  },
  {
    id: "PC-04",
    status: "has-specs",
    specs: 2,
    row: 1,
    col: 3,
    cpu: "Intel i5-11400",
    ram: "16GB DDR4",
    storage: "512GB SSD",
    os: "Windows 11",
    added: "Jul 2024",
  },
  {
    id: "PC-05",
    status: "has-specs",
    specs: 4,
    row: 1,
    col: 4,
    cpu: "AMD Ryzen 5",
    ram: "16GB DDR4",
    storage: "1TB SSD",
    os: "Windows 11",
    added: "Sep 2024",
  },
];

const tabs = [
  "IT Office",
  "Computer Lab 1",
  "Computer Lab 2",
  "Computer Lab 3",
  "Computer Lab 4",
];

const STATUS = {
  "has-specs": {
    cell: "border-blue-500/60 bg-blue-500/5 hover:bg-blue-500/10",
    dot: "bg-blue-400",
    icon: "text-blue-400",
    name: "text-blue-400",
    specs: "text-blue-400/70",
  },
  defective: {
    cell: "border-red-500/60 bg-red-500/5 hover:bg-red-500/10",
    dot: "bg-red-400",
    icon: "text-red-400",
    name: "text-red-400",
    specs: "text-red-400/70",
  },
  empty: {
    cell: "border-zinc-700/50 hover:border-zinc-600 hover:bg-zinc-800/40 opacity-50",
    dot: "bg-zinc-600",
    icon: "text-zinc-600",
    name: "text-zinc-600",
    specs: "",
  },
};

function PCCell({ pc, isSelected, onClick }) {
  const status = pc ? pc.status : "empty";
  const s = STATUS[status];

  return (
    <div
      onClick={pc ? onClick : undefined}
      className={[
        "relative flex flex-col items-center justify-center gap-1.5 rounded-xl border px-2 py-3 min-h-22 transition-all duration-150",
        s.cell,
        pc ? "cursor-pointer" : "cursor-default",
        isSelected ? "ring-2 ring-blue-500/30 border-blue-500" : "",
      ].join(" ")}
    >
      <span
        className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${s.dot}`}
      />
      <Monitor size={20} className={`shrink-0 ${s.icon}`} />
      <span className={`text-[10px] font-medium ${s.name}`}>
        {pc ? pc.id : "EMPTY"}
      </span>
      {pc && (
        <span className={`text-[9px] ${s.specs}`}>
          {pc.specs} spec{pc.specs > 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
}

function DetailRow({ label, value, valueClass = "" }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-zinc-800 last:border-0">
      <span className="text-xs text-zinc-400">{label}</span>
      <span className={`text-xs font-medium text-zinc-100 ${valueClass}`}>
        {value}
      </span>
    </div>
  );
}

function Tag({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-md border border-zinc-700 text-[11px] text-zinc-400 bg-zinc-800/60 mr-1.5 mb-1.5 ${className}`}
    >
      {children}
    </span>
  );
}

function Sidebar({ selected }) {
  if (!selected) {
    return (
      <div className="w-60 shrink-0 bg-zinc-900 border-l border-zinc-800 flex flex-col">
        <div className="px-4 py-3.5 border-b border-zinc-800">
          <p className="text-sm font-medium text-zinc-100">Select a computer</p>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            Click any unit on the blueprint
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-2 opacity-40">
          <Monitor size={32} className="text-zinc-500" />
          <p className="text-xs text-zinc-400 text-center">
            Click a computer
            <br />
            to view its details
          </p>
        </div>
      </div>
    );
  }

  const isDefective = selected.status === "defective";

  return (
    <div className="w-60 shrink-0 bg-zinc-900 border-l border-zinc-800 flex flex-col">
      <div className="px-4 py-3.5 border-b border-zinc-800">
        <p className="text-sm font-medium text-zinc-100">{selected.id}</p>
        <p
          className={`text-[11px] mt-0.5 ${isDefective ? "text-red-400" : "text-zinc-500"}`}
        >
          {isDefective
            ? `⚠ ${selected.issue}`
            : `${selected.specs} spec${selected.specs > 1 ? "s" : ""} recorded`}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
            Hardware
          </p>
          <DetailRow label="CPU" value={selected.cpu} />
          <DetailRow label="RAM" value={selected.ram} />
          <DetailRow label="Storage" value={selected.storage} />
          <DetailRow label="OS" value={selected.os} />
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
            Record
          </p>
          <DetailRow label="Date added" value={selected.added} />
          <DetailRow
            label="Status"
            value={isDefective ? "Defective" : "Operational"}
            valueClass={isDefective ? "text-red-400" : "text-emerald-400"}
          />
          {isDefective && (
            <DetailRow
              label="Issue"
              value={selected.issue}
              valueClass="text-red-400"
            />
          )}
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
            Tags
          </p>
          <Tag>Lab A</Tag>
          <Tag>Row {selected.row + 1}</Tag>
          <Tag>Col {selected.col + 1}</Tag>
          <Tag
            className={
              isDefective
                ? "text-red-400 border-red-500/30"
                : "text-emerald-400 border-emerald-500/30"
            }
          >
            {isDefective ? "needs repair" : "operational"}
          </Tag>
        </div>
      </div>
    </div>
  );
}

export default function LaboratoriesTab() {
  const [activeTab, setActiveTab] = useState("Computer Lab 2");
  const [selected, setSelected] = useState(null);

  const hasSpecs = computers.filter((p) => p.status === "has-specs").length;
  const defective = computers.filter((p) => p.status === "defective").length;
  const empty = ROWS * COLS - computers.length;

  return (
    <div className="flex h-full bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800">
      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
          <div>
            <p className="text-sm font-medium text-zinc-100">Laboratories</p>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Laboratory Room A — Blueprint view
            </p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors">
            <Plus size={13} strokeWidth={2.5} />
            Add Computer
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 bg-zinc-900/60 border-b border-zinc-800 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 border",
                activeTab === tab
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-zinc-400 border-zinc-700 hover:border-zinc-600 hover:text-zinc-200 hover:bg-zinc-800",
              ].join(" ")}
            >
              {tab}
            </button>
          ))}
          <button className="ml-1 px-3 py-1.5 rounded-lg text-xs text-zinc-500 border border-dashed border-zinc-700 hover:border-zinc-500 hover:text-zinc-300 transition-colors whitespace-nowrap">
            + New Lab
          </button>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/30 border-b border-zinc-800">
          {[
            { dot: "bg-blue-400", label: `${hasSpecs} with specs` },
            { dot: "bg-red-400", label: `${defective} defective` },
            { dot: "bg-zinc-600", label: `${empty} empty` },
          ].map(({ dot, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-[11px] text-zinc-400"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
              {label}
            </div>
          ))}
          <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-[11px] text-zinc-400">
            {ROWS}×{COLS} grid
          </div>
        </div>

        {/* Blueprint area */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800">
            {/* Room header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <Monitor size={17} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-100">
                  Laboratory Room A
                </p>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  Main Building · Floor 1
                </p>
              </div>
              <div className="ml-auto flex gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-blue-500/10 text-blue-400">
                  Active
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-zinc-800 text-zinc-400 border border-zinc-700">
                  30 slots
                </span>
              </div>
            </div>

            {/* Teacher's desk divider */}
            <div className="flex items-center gap-3 px-4 py-2.5">
              <div className="flex-1 h-px bg-zinc-700/60" />
              <span className="text-[10px] text-zinc-600 tracking-widest uppercase">
                Teacher's Desk
              </span>
              <div className="flex-1 h-px bg-zinc-700/60" />
            </div>

            {/* PC grid */}
            <div className="px-4 pb-4">
              <div className="grid grid-cols-6 gap-2">
                {Array.from({ length: ROWS * COLS }, (_, i) => {
                  const row = Math.floor(i / COLS);
                  const col = i % COLS;
                  const pc =
                    computers.find((p) => p.row === row && p.col === col) ??
                    null;
                  return (
                    <PCCell
                      key={i}
                      pc={pc}
                      isSelected={selected?.id === pc?.id}
                      onClick={() => setSelected(pc)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar selected={selected} />
    </div>
  );
}
