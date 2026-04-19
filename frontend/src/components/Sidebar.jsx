import { NavLink, useNavigate } from "react-router-dom";
import {
  FileChartLine,
  LaptopMinimal,
  Package,
  PcCase,
  Building2,
  LogOut,
} from "lucide-react";
import useAuth from "../context/useAuth";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    {
      id: 1,
      link: "/inventory",
      icon: <Package size={18} className="shrink-0" />,
      label: "Inventory",
    },
    {
      id: 2,
      link: "/computers",
      icon: <LaptopMinimal size={18} className="shrink-0" />,
      label: "Computers",
    },
    {
      id: 3,
      link: "/laboratories",
      icon: <Building2 size={18} className="shrink-0" />,
      label: "Laboratories",
    },
    {
      id: 4,
      link: "/reports",
      icon: <FileChartLine size={18} className="shrink-0" />,
      label: "Reports",
    },
  ];

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-150 ${
      isActive
        ? "bg-cyan-500/20 text-cyan-400 font-semibold"
        : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
    }`;

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="flex flex-col bg-zinc-900 border-r border-zinc-800 h-screen sticky top-0 shrink-0 w-52">
      {/* Logo */}
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
          {navLinks.map(({ id, link, icon, label }) => (
            <NavLink key={id} to={link} end className={navClass}>
              {icon}
              <span className="text-sm whitespace-nowrap overflow-hidden">
                {label}
              </span>
            </NavLink>
          ))}
        </ul>
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-zinc-800">
        {user && (
          <p className="text-[11px] text-zinc-500 font-mono truncate mb-2 px-1">
            {user.email}
          </p>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-zinc-400 hover:bg-red-500/10 hover:text-red-400 transition-colors duration-150"
        >
          <LogOut size={18} className="shrink-0" />
          <span className="text-sm">Sign out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
