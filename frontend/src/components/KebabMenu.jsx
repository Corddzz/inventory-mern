import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";

const KebabMenu = ({ onEdit, onDelete, className = "" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      <Button
        onClick={toggleMenu}
        icon={EllipsisVertical}
        variant="secondary"
        className="p-3"
      />

      {isMenuOpen && (
        <div
          className={`absolute right-0 mt-2 w-44 overflow-hidden rounded-xl bg-zinc-800 shadow-lg ring-1 ring-zinc-700 z-50 ${className}`}
        >
          <button
            onClick={onEdit}
            className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-zinc-700/40 transition duration-300"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            onClick={onDelete}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-zinc-700/40 transition duration-300"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default KebabMenu;
