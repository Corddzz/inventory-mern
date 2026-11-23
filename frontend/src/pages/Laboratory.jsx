import { useState } from "react";
import {
  Building2,
  Cpu,
  HardDrive,
  MapPin,
  MemoryStick,
  Monitor,
  Plus,
  Wrench,
} from "lucide-react";

const ROWS = 5;
const COLS = 6;

const labs = [
  "IT Office",
  "Computer Lab 1",
  "Computer Lab 2",
  "Computer Lab 3",
  "Computer Lab 4",
];

const computers = [
  {
    id: "PC-01",
    status: "operational",
    specs: 3,
    row: 0,
    col: 0,
    cpu: "Intel i5-10400",
    ram: "8 GB DDR4",
    storage: "256 GB SSD",
  },
  {
    id: "PC-02",
    status: "operational",
    specs: 1,
    row: 0,
    col: 1,
    cpu: "Intel i3-9100",
    ram: "4 GB DDR4",
    storage: "128 GB SSD",
  },
  {
    id: "PC-03",
    status: "defective",
    specs: 1,
    row: 0,
    col: 2,
    cpu: "AMD Ryzen 3",
    ram: "4 GB DDR4",
    storage: "128 GB HDD",
  },
  {
    id: "PC-04",
    status: "operational",
    specs: 2,
    row: 1,
    col: 3,
    cpu: "Intel i5-11400",
    ram: "16 GB DDR4",
    storage: "512 GB SSD",
  },
  {
    id: "PC-05",
    status: "operational",
    specs: 4,
    row: 1,
    col: 4,
    cpu: "AMD Ryzen 5",
    ram: "16 GB DDR4",
    storage: "1 TB SSD",
  },
];

const Laboratory = () => {
  const [activeLab, setActiveLab] = useState("Computer Lab 2");
  const [selected, setSelected] = useState(null);

  const hasSpecs = computers.filter(
    (computer) => computer.status !== "defective",
  ).length;
  const defective = computers.filter(
    (computer) => computer.status === "defective",
  ).length;
  const empty = ROWS * COLS - computers.length;

  const getComputer = (row, col) =>
    computers.find(
      (computer) => computer.row === row && computer.col === col,
    );

  return (
    <div className="min-h-[calc(100vh-7rem)] space-y-4">
      <div className="card border border-base-300 bg-base-100">
        <div className="card-body p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-box bg-primary text-primary-content">
              <Building2 size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold">Laboratories</h1>
              <p className="text-sm text-base-content/60">
                Room inventory and computer assignments
              </p>
            </div>
          </div>
          <button className="btn btn-primary btn-sm mt-3 sm:mt-0">
            <Plus size={16} />
            Add computer
          </button>
        </div>
      </div>

      <div className="tabs tabs-box border border-base-300 bg-base-100 p-1.5 overflow-x-auto">
        {labs.map((lab) => (
          <button
            key={lab}
            type="button"
            onClick={() => {
              setActiveLab(lab);
              setSelected(null);
            }}
            className={`tab whitespace-nowrap ${activeLab === lab ? "tab-active" : ""}`}
          >
            {lab}
          </button>
        ))}
        <button type="button" className="tab whitespace-nowrap text-primary">
          <Plus size={14} className="mr-1" />
          New lab
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="stat rounded-box border border-base-300 bg-base-100 px-4 py-3">
          <div className="stat-title">Total slots</div>
          <div className="stat-value text-2xl">{ROWS * COLS}</div>
        </div>
        <div className="stat rounded-box border border-base-300 bg-base-100 px-4 py-3">
          <div className="stat-title">With specs</div>
          <div className="stat-value text-2xl text-success">{hasSpecs}</div>
        </div>
        <div className="stat rounded-box border border-base-300 bg-base-100 px-4 py-3">
          <div className="stat-title">Defective</div>
          <div className="stat-value text-2xl text-error">{defective}</div>
        </div>
        <div className="stat rounded-box border border-base-300 bg-base-100 px-4 py-3">
          <div className="stat-title">Empty</div>
          <div className="stat-value text-2xl text-base-content/45">
            {empty}
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <section className="card border border-base-300 bg-base-100">
          <div className="card-body p-4">
            <div className="flex items-start justify-between gap-3 border-b border-base-300 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-box bg-primary/10 text-primary">
                  <Monitor size={19} />
                </div>
                <div>
                  <h2 className="font-semibold">{activeLab}</h2>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-base-content/55">
                    <MapPin size={12} />
                    Main Building · Floor 1
                  </p>
                </div>
              </div>
              <div className="badge badge-success badge-soft">Active</div>
            </div>

            <div className="divider my-2 text-xs text-base-content/45">
              Teacher's desk
            </div>

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
              {Array.from({ length: ROWS * COLS }, (_, index) => {
                const row = Math.floor(index / COLS);
                const col = index % COLS;
                const computer = getComputer(row, col);

                if (!computer) {
                  return (
                    <div
                      key={index}
                      className="flex aspect-square min-h-24 flex-col items-center justify-center gap-2 rounded-box border border-dashed border-base-300 text-base-content/25"
                    >
                      <Monitor size={22} />
                      <span className="text-[10px]">Empty</span>
                    </div>
                  );
                }

                const defective = computer.status === "defective";

                return (
                  <button
                    key={computer.id}
                    type="button"
                    onClick={() => setSelected(computer)}
                    className={`relative flex aspect-square min-h-24 flex-col items-center justify-center gap-1.5 rounded-box border transition ${
                      defective
                        ? "border-error/50 bg-error/8 text-error hover:bg-error/12"
                        : "border-success/40 bg-success/8 text-success hover:bg-success/12"
                    } ${selected?.id === computer.id ? "ring-2 ring-primary ring-offset-2 ring-offset-base-100" : ""}`}
                  >
                    {defective ? (
                      <Wrench size={15} className="absolute right-2 top-2" />
                    ) : (
                      <span className="absolute right-2 top-2 size-2 rounded-full bg-success" />
                    )}
                    <Monitor size={24} />
                    <span className="text-xs font-bold">{computer.id}</span>
                    <span className="text-[10px] opacity-70">
                      {computer.specs} specs
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <aside className="card h-fit border border-base-300 bg-base-100">
          {selected ? (
            <>
              <div className="border-b border-base-300 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold">{selected.id}</h2>
                  <div
                    className={`badge badge-sm ${selected.status === "defective" ? "badge-error badge-soft" : "badge-success badge-soft"}`}
                  >
                    {selected.status === "defective"
                      ? "Defective"
                      : "Operational"}
                  </div>
                </div>
                <p className="mt-1 text-xs text-base-content/55">
                  Row {selected.row + 1} · Column {selected.col + 1}
                </p>
              </div>
              <div className="card-body p-4">
                <div className="flex items-center gap-3 border-b border-base-300 pb-3">
                  <Cpu size={18} className="text-primary" />
                  <div>
                    <p className="text-xs text-base-content/55">Processor</p>
                    <p className="text-sm font-medium">{selected.cpu}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-b border-base-300 pb-3">
                  <MemoryStick size={18} className="text-primary" />
                  <div>
                    <p className="text-xs text-base-content/55">Memory</p>
                    <p className="text-sm font-medium">{selected.ram}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <HardDrive size={18} className="text-primary" />
                  <div>
                    <p className="text-xs text-base-content/55">Storage</p>
                    <p className="text-sm font-medium">{selected.storage}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="card-body items-center py-10 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-base-200 text-base-content/30">
                <Monitor size={26} />
              </div>
              <h2 className="mt-2 font-semibold">Select a computer</h2>
              <p className="text-sm text-base-content/55">
                Choose a unit on the blueprint to view its details.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Laboratory;
