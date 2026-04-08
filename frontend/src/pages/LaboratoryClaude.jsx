import { useEffect, useState } from "react";
import Button from "../components/Button";
import { PlusIcon, Monitor } from "lucide-react";
import { fetchRoom } from "../api/axios";

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const labs = [
  {
    id: 1,
    name: "Laboratory Room A",
    emoji: "🏠",
    count: 5,
    grid: { rows: 5, cols: 6 },
    building: "Main Building, Floor 1",
  },
  {
    id: 2,
    name: "Computer Lab 2",
    emoji: "🏠",
    count: 2,
    grid: { rows: 4, cols: 5 },
    building: "Main Building, Floor 2",
  },
];

const computers = [
  { slot: 0, id: "PC-01", status: "has-specs", specs: 3 },
  { slot: 1, id: "PC-02", status: "has-specs", specs: 1 },
  { slot: 2, id: "PC-03", status: "defective", specs: 1 },
  { slot: 9, id: "PC-04", status: "has-specs", specs: 2 },
  { slot: 10, id: "PC-05", status: "has-specs", specs: 4 },
];

// ─── Legend Dot ────────────────────────────────────────────────────────────────
const LegendDot = ({ color, label }) => (
  <div className="flex items-center gap-1.5">
    <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
    <span className="text-sm text-zinc-400">{label}</span>
  </div>
);

// ─── Computer Slot ─────────────────────────────────────────────────────────────
const ComputerSlot = ({ computer, onClick, isSelected }) => {
  if (!computer) {
    return (
      <div className="aspect-square rounded-xl border border-dashed border-zinc-700 flex flex-col items-center justify-center gap-2 cursor-default">
        <Monitor size={28} className="text-zinc-700" />
        <span className="text-[10px] tracking-widest uppercase text-zinc-600">
          Empty
        </span>
      </div>
    );
  }

  const styles = {
    "has-specs": {
      wrapper: `border-2 border-blue-500 bg-blue-500/10 ${isSelected ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-zinc-950" : ""}`,
      dot: "bg-green-400",
      text: "text-blue-400",
      icon: "text-blue-400",
    },
    defective: {
      wrapper: `border-2 border-red-500 bg-red-500/10 ${isSelected ? "ring-2 ring-red-400 ring-offset-2 ring-offset-zinc-950" : ""}`,
      dot: "bg-red-500",
      text: "text-red-400",
      icon: "text-red-400",
    },
  };

  const s = styles[computer.status];

  return (
    <div
      onClick={() => onClick(computer)}
      className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer relative transition-all duration-150 hover:brightness-110 ${s.wrapper}`}
    >
      <span
        className={`absolute top-2 right-2 w-2 h-2 rounded-full ${s.dot}`}
      />
      <Monitor size={28} className={s.icon} />
      <div className="text-center">
        <p className={`text-xs font-semibold ${s.text}`}>{computer.id}</p>
        <p className="text-[10px] text-zinc-500">{computer.specs} specs</p>
      </div>
    </div>
  );
};

// ─── Detail Panel ──────────────────────────────────────────────────────────────
const DetailPanel = ({ computer }) => (
  <aside className="w-72 shrink-0 border-l border-zinc-800 bg-zinc-900 p-6 flex flex-col gap-4">
    <div>
      <h3 className="text-base font-bold text-zinc-100">Select a Computer</h3>
      <p className="text-xs text-zinc-500 mt-0.5">
        Click any unit on the blueprint
      </p>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
      <Monitor
        size={48}
        className={computer ? "text-blue-400" : "text-zinc-700"}
      />
      {computer ? (
        <div>
          <p className="text-sm font-bold text-zinc-100">{computer.id}</p>
          <p className="text-xs text-zinc-500 mt-1 capitalize">
            {computer.status.replace("-", " ")}
          </p>
          <p className="text-xs text-zinc-500">
            {computer.specs} spec(s) recorded
          </p>
        </div>
      ) : (
        <p className="text-sm text-zinc-500">
          Click a computer on the blueprint to view its specs.
        </p>
      )}
    </div>
  </aside>
);

// ─── Laboratory Page ───────────────────────────────────────────────────────────
const LaboratoryClaude = () => {
  const [rooms, setRooms] = useState([]);
  const [activeLab, setActiveLab] = useState(labs[0]);
  const [selectedComputer, setSelectedComputer] = useState(null);

  const totalSlots = activeLab.grid.rows * activeLab.grid.cols;
  const slotMap = computers.reduce((acc, c) => {
    acc[c.slot] = c;
    return acc;
  }, {});

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await fetchRoom();
        console.table(data);
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    loadRooms();
  }, []);

  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-100">
      <div className="bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-base font-bold text-zinc-100">Laboratories</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            {activeLab.name} — Blueprint view
          </p>
        </div>
        <Button title="Add Computer" icon={PlusIcon} />
      </div>

      <div className="flex items-center gap-2 px-6 py-3 border-b border-zinc-800">
        {rooms.map((lab) => (
          <button
            key={lab.id}
            onClick={() => {
              setActiveLab(lab);
              setSelectedComputer(null);
            }}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150
              ${
                activeLab.id === lab.id
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100"
              }`}
          >
            <span>{lab.emoji}</span>
            <span>{lab.name}</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-md font-mono
              ${activeLab.id === lab.id ? "bg-blue-500/40 text-white" : "bg-zinc-700 text-zinc-400"}`}
            >
              {lab.count}
            </span>
          </button>
        ))}
        <button
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium text-zinc-400
          border border-dashed border-zinc-700 hover:border-zinc-500 hover:text-zinc-100 transition-colors duration-150"
        >
          <PlusIcon size={14} />
          <span>New Lab</span>
        </button>
      </div>

      {/* ── Legend ── */}
      <div className="flex items-center gap-5 px-6 py-3 border-b border-zinc-800">
        <LegendDot color="bg-blue-500" label="Has specs" />
        <LegendDot color="bg-red-500" label="Defective" />
        <LegendDot color="bg-zinc-600" label="Empty slot" />
      </div>

      {/* ── Main Content ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Blueprint Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            {/* Lab Header */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl">{activeLab.emoji}</span>
              <div>
                <h2 className="text-sm font-bold text-zinc-100">
                  {activeLab.name}
                </h2>
                <p className="text-xs text-zinc-500">
                  {activeLab.grid.rows}×{activeLab.grid.cols} grid ·{" "}
                  {activeLab.building}
                </p>
              </div>
            </div>

            {/* Teacher's Desk */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-full border border-dashed border-zinc-700 rounded-xl py-3 text-center">
                <span className="text-[10px] tracking-[4px] uppercase text-zinc-600 font-mono">
                  ─── Teacher's Desk ───
                </span>
              </div>
            </div>

            {/* Computer Grid */}
            <div
              className="grid gap-3"
              style={{
                gridTemplateColumns: `repeat(${activeLab.grid.cols}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: totalSlots }).map((_, i) => (
                <ComputerSlot
                  key={i}
                  computer={slotMap[i] || null}
                  isSelected={selectedComputer?.slot === i}
                  onClick={setSelectedComputer}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <DetailPanel computer={selectedComputer} />
      </div>
    </div>
  );
};

export default LaboratoryClaude;
