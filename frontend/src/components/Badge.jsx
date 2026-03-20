import React from "react";

const Badge = ({ category }) => {
  const colors = {
    Equipment: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
    Consumables: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    Tools: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
  };

  return (
    <span
      className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${colors[category] ?? "bg-zinc-700 text-zinc-300"}`}
    >
      {category}
    </span>
  );
};

export default Badge;
