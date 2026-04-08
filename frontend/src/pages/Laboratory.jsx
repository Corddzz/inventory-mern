import Button from "../components/Button";
import { Monitor, PlusIcon } from "lucide-react";

const Laboratory = () => {
  return (
    <div className="flex flex-col h-full bg-zinc-950 text-zinc-100">
      <div className="bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-base font-bold text-zinc-100">Laboratories</h1>
          <p className="text-xs text-zinc-500 mt-0.5">Laboratory Rooms</p>
        </div>
        <Button title="Add Item" icon={PlusIcon} />
      </div>

      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/30 border-b border-zinc-800">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-[11px] text-zinc-400">
          <span className={`w-1.5 h-1.5 rounded-full bg-blue-400`} />
          Has specs
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-[11px] text-zinc-400">
          <span className={`w-1.5 h-1.5 rounded-full bg-red-400`} />
          Defective
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-[11px] text-zinc-400">
          <span className={`w-1.5 h-1.5 rounded-full bg-zinc-600`} />
          Empty
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
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

        <div className="flex items-center gap-3 px-4 py-2.5">
          <div className="flex-1 h-px bg-zinc-700/60" />
          <span className="text-[10px] text-zinc-600 tracking-widest uppercase">
            Teacher's Desk
          </span>
          <div className="flex-1 h-px bg-zinc-700/60" />
        </div>
        <div className="px-4 pb-4">
          <div className="grid grid-cols-6 gap-2">{/* <PCCell /> */}</div>
        </div>
      </div>
    </div>
  );
};

export default Laboratory;
