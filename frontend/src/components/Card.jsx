import React from "react";

const Card = ({ label, value, valueColor, sub }) => {
  return (
    <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 flex flex-col gap-2">
      <span className="text-[10px] tracking-widest uppercase text-zinc-500 font-mono">
        {label}
      </span>
      <span className={`text-4xl font-bold ${valueColor}`}>{value}</span>
      <span className="text-xs text-zinc-500">{sub}</span>
    </div>
  );
};

export default Card;
