import React from "react";

const Input = ({
  type,
  placeholder,
  className = "",
  onChange,
  value,
  name,
}) => {
  return (
    <div>
      <input
        required
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border rounded-lg w-full px-3 py-2 outline-2 outline-zinc-900 focus:outline-cyan-300 border-zinc-700 focus:ring-1 ${className}`}
      />
    </div>
  );
};

export default Input;
