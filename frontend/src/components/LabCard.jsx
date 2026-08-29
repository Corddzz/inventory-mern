import React from "react";
import {
  Monitor,
  Building,
  SquareArrowOutUpRight,
  Layers3,
  EllipsisVertical,
} from "lucide-react";
import Button from "./Button";
import KebabMenu from "./KebabMenu";

const LabCard = ({
  name,
  building,
  floor,
  icon: Icon = Monitor,
  onClick,
  className = "",
  onEdit,
  onDelete,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        group w-full rounded-2xl
        border border-zinc-800/80
        bg-zinc-900/50
        px-5 py-4
        transition-all duration-300
        
        ${className}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="
              rounded-2xl
              bg-cyan-500/10
              p-3
              text-cyan-300
              ring-1 ring-cyan-500/15
              transition-all duration-300
            "
          >
            <Icon size={22} />
          </div>

          <div className="text-left">
            <h3 className="text-[15px] font-medium tracking-wide text-zinc-100 transition-colors group-hover:text-white">
              {name}
            </h3>

            <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500 transition-colors">
              <div className="flex items-center gap-1">
                <Building size={15} />
                <span>{building}</span>
              </div>

              <div className="h-1 w-1 rounded-full bg-zinc-700 " />

              <div className="flex items-center gap-1">
                <Layers3 size={15} />
                <span>{floor}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <Button
            icon={SquareArrowOutUpRight}
            variant="secondary"
            className="p-3"
          />
          <KebabMenu onEdit={onEdit} />
        </div>
      </div>
    </div>
  );
};

export default LabCard;
