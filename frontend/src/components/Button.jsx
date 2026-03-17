import React from "react";

const Button = ({ onClick, title, icon: Icon, type }) => {
  return (
    <button
      className="flex items-center gap-2 px-3 py-2 rounded-xl transition-colors duration-150 cursor-pointer bg-cyan-500/20 text-cyan-400 font-semibold hover:bg-cyan-500/30"
      onClick={onClick}
      type={type}
    >
      {Icon && <Icon size={16} className="shrink-0" />}
      <span className="text-sm whitespace-nowrap">{title}</span>
    </button>
  );
};

export default Button;
