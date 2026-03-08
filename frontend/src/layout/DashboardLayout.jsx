import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Menu,
  FileChartLine,
  LaptopMinimal,
  Package,
  PcCase,
  Building2,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={(e) => setIsOpen(e.target.checked)}
      />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 ">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost "
          >
            {/* Sidebar toggle icon */}
            <Menu className="my-1.5 inline-block size-4" />
          </label>
        </nav>
        {/* Page content here */}
        <main>
          <Outlet />
        </main>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-50">
          {/* Sidebar content here */}

          <div className="flex items-center justify-center gap-2.5 px-3 py-2 my-2">
            <PcCase />
            <div className="is-drawer-close:hidden">
              <div className="font-bold text-base tracking-[.3px]">
                LabTrack
              </div>
              <div className="text-[10px] font-mono font-[IBM Plex Mono]">
                v1.0 · ICT Dept
              </div>
            </div>
          </div>
          <div className="divider p-2 my-0"></div>
          <ul className="menu w-full grow ">
            <div className="text-[10px] tracking-[2px] uppercase text-white/25 px-2 my-2 font-mono is-drawer-close:hidden">
              Main
            </div>

            {/* List item */}
            <li>
              <NavLink
                to="/inventory"
                end
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-3 py-2 rounded-xl ${
                    isActive
                      ? "bg-accent text-accent-content"
                      : "text-base-content"
                  }`
                }
                data-tip="Inventory"
              >
                {/* Inventory icon */}
                <Package />
                <span className="is-drawer-close:hidden"> Inventory</span>
              </NavLink>
            </li>

            {/* List item */}
            <li>
              <NavLink
                to="/computers"
                end
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-3 py-2 rounded-xl ${
                    isActive
                      ? "bg-accent text-accent-content"
                      : "text-base-content"
                  }`
                }
                data-tip="Computers"
              >
                <LaptopMinimal />
                <span className="is-drawer-close:hidden">Computers</span>
              </NavLink>
            </li>
            {/* List item */}
            <li>
              <NavLink
                to="/laboratories"
                end
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-3 py-2 rounded-xl ${
                    isActive
                      ? "bg-accent text-accent-content"
                      : "text-base-content"
                  }`
                }
                data-tip="Laboratories"
              >
                <Building2 />
                <span className="is-drawer-close:hidden">Laboratories</span>
              </NavLink>
            </li>
            {/* List item */}
            <li>
              <NavLink
                to="/reports"
                end
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-3 py-2 rounded-xl ${
                    isActive
                      ? "bg-accent text-accent-content"
                      : "text-base-content"
                  }`
                }
                data-tip="Reports"
              >
                <FileChartLine />
                <span className="is-drawer-close:hidden">Reports</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
