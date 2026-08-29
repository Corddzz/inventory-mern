import React from "react";

const Fieldv2 = ({ label, required, children }) => {
  return (
    <div className="mb-3">
      <label className="block text-xs font-medium tracking-wide font-mono text-neutral-400 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
};

export default Fieldv2;
