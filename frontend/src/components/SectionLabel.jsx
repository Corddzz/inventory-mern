import React from "react";

const SectionLabel = ({ children }) => {
  return (
    <h3 className="text-sm font-semibold tracking-wide text-neutral-300 font-mono uppercase mb-4">
      {children}
    </h3>
  );
};

export default SectionLabel;
