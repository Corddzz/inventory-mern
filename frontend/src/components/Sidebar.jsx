import React from "react";
import { NavLink } from "react-router-dom";
import {
  FileChartLine,
  LaptopMinimal,
  Package,
  PcCase,
  Building2,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside
      className="flex flex-col bg-zinc-900 border-r border-zinc-800
        h-screen sticky top-0 shrink-0 w-52"
    >
      <div className="flex items-center gap-2.5 px-3 py-4 border-b border-zinc-800">
        <PcCase size={20} className="text-cyan-400 shrink-0" />
        <div className="overflow-hidden">
          <div className="font-bold text-sm tracking-wide text-zinc-100 whitespace-nowrap">
            LabTrack
          </div>
          <div className="text-[10px] font-mono text-zinc-500 whitespace-nowrap">
            v1.0 · ICT Dept
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-1 overflow-hidden">
        <span className="text-[10px] tracking-widest uppercase text-zinc-600 font-mono whitespace-nowrap">
          Main
        </span>
      </div>

      <nav className="flex-1 px-2 py-2">
        <ul className="flex flex-col gap-1">
          <NavLink
            to="/inventory"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150
        ${
          isActive
            ? "bg-cyan-500/20 text-cyan-400 font-semibold"
            : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
        }`
            }
          >
            <Package size={18} className="shrink-0" />
            <span className="text-sm whitespace-nowrap overflow-hidden">
              Inventory
            </span>
          </NavLink>
          <NavLink
            to="/computers"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150
        ${
          isActive
            ? "bg-cyan-500/20 text-cyan-400 font-semibold"
            : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
        }`
            }
          >
            <LaptopMinimal size={18} className="shrink-0" />
            <span className="text-sm whitespace-nowrap overflow-hidden">
              Computers
            </span>
          </NavLink>
          <NavLink
            to="/laboratories"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150
        ${
          isActive
            ? "bg-cyan-500/20 text-cyan-400 font-semibold"
            : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
        }`
            }
          >
            <Building2 size={18} className="shrink-0" />
            <span className="text-sm whitespace-nowrap overflow-hidden">
              Laboratories
            </span>
          </NavLink>
          <NavLink
            to="/reports"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150
        ${
          isActive
            ? "bg-cyan-500/20 text-cyan-400 font-semibold"
            : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
        }`
            }
          >
            <FileChartLine size={18} className="shrink-0" />
            <span className="text-sm whitespace-nowrap overflow-hidden">
              Reports
            </span>
          </NavLink>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
