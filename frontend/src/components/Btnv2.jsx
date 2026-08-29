import React from "react";

const Btnv2 = ({ children, onClick, prepend, append, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center text-center justify-center gap-2 ps-3 pe-5 py-2 rounded-lg 
              bg-cyan-500 text-neutral-950 font-semibold
              transition-all duration-300
              hover:shadow-lg
              hover:shadow-cyan-500/50
              ${className}`}
    >
      {prepend && <span className="flex items-center">{prepend}</span>}
      <span>{children}</span>
      {append && <span className="flex items-center">{append}</span>}
    </button>
  );
};

export default Btnv2;
