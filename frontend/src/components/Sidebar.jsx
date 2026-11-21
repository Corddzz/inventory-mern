import { NavLink } from "react-router";
import {
  FileChartLine,
  LaptopMinimal,
  Package,
  PcCase,
  Building2,
} from "lucide-react";

import { HomeIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  const navLinks = [
    {
      path: "/home",
      icon: HomeIcon,
      name: "Dashboard",
    },
    {
      path: "/inventory",
      icon: Package,
      name: "Inventory",
    },
    {
      path: "/computers",
      icon: LaptopMinimal,
      name: "Computers",
    },
    {
      path: "/laboratories",
      icon: Building2,
      name: "Laboratories",
    },
    {
      path: "/reports",
      icon: FileChartLine,
      name: "Reports",
    },
  ];

  return (
    <aside className="drawer-side is-drawer-close:overflow-visible">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        {/* Sidebar content here */}
        <ul className="menu w-full grow gap-3 mt-1">
          {navLinks.map(({ name, path, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip={name}
              >
                <Icon
                  size={18}
                  className="my-1.5 inline-block size-4 shrink-0"
                />

                <span className="is-drawer-close:hidden">{name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
