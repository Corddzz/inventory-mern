import React from "react";

const Button = ({
  onClick,
  title,
  icon: Icon,
  type,
  variant = "primary",
  className = "",
}) => {
  const variants = {
    primary: "bg-cyan-400 hover:shadow-cyan-500/50 text-neutral-900",
    secondary:
      "bg-transparent text-zinc-300 hover:bg-zinc-800/60 focus-visible:ring-zinc-400/60",
  };
  return (
    <button
      className={`flex items-center ${
        title ? "gap-2" : "justify-center"
      } rounded-lg
    font-semibold
    transition-all duration-300
    hover:shadow-lg
    hover:scale-105
    cursor-pointer
    ${variants[variant]} ${className}`}
      onClick={onClick}
      type={type}
    >
      {Icon && <Icon size={16} className="shrink-0" />}
      {title && <span className="text-sm whitespace-nowrap">{title}</span>}
    </button>
  );
};

export default Button;
