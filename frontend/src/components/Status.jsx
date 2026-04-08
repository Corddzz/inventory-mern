import React from "react";

const Status = ({ status }) => {
  const colors = {
    Good: "bg-green-500/10 text-green-400 border border-green-500/20",
    Defective: "bg-red-500/10 text-red-400 border border-red-500/20",
  };

  return (
    <span
      className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${colors[status] ?? "bg-zinc-700 text-zinc-300"}`}
    >
      {status}
    </span>
  );
};

export default Status;
