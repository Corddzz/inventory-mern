import React from "react";

const Field = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-semibold tracking-widest uppercase text-zinc-500">
        {label}
      </label>
      {children}
    </div>
  );
};

export default Field;
