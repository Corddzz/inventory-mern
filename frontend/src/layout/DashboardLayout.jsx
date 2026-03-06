import React from "react";
import { Outlet } from "react-router-dom";
import { Home, Box, BarChart2, Menu } from "lucide-react";
import Logo from "../assets/inventory-management.png";
import { NavLink } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <Menu className="my-1.5 inline-block size-4" />
          </label>
          <div className="size-11">
            <img src={Logo} alt="" />
          </div>
          <div className="px-4">Inventory Management System</div>
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
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-3 py-2 ${
                    isActive
                      ? "bg-accent text-accent-content"
                      : "text-base-content"
                  }`
                }
                data-tip="Homepage"
              >
                {/* Home icon */}
                <Home className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Homepage</span>
              </NavLink>
            </li>

            {/* List item */}
            <li>
              <NavLink
                to="/inventory"
                end
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-3 py-2 ${
                    isActive
                      ? "bg-accent text-accent-content"
                      : "text-base-content"
                  }`
                }
                data-tip="Inventory"
              >
                {/* Inventory icon */}
                <Box className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Inventory</span>
              </NavLink>
            </li>

            {/* List item */}
            <li>
              <NavLink
                to="/reports"
                end
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2 px-3 py-2 ${
                    isActive
                      ? "bg-accent text-accent-content"
                      : "text-base-content"
                  }`
                }
                data-tip="Reports"
              >
                {/* Reports icon */}
                <BarChart2 className="my-1.5 inline-block size-4" />
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
