import React from "react";
import {
  Monitor,
  Building,
  SquareArrowOutUpRight,
  Layers3,
} from "lucide-react";

const LabCard = ({
  name,
  building,
  floor,
  icon: Icon = Monitor,
  onClick,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group w-full rounded-2xl
        border border-zinc-800/80
        bg-zinc-900/50
        px-5 py-4
        backdrop-blur-sm
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-cyan-500/20
        hover:bg-zinc-900/70
        hover:shadow-xl hover:shadow-cyan-950/20
        cursor-pointer
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
              group-hover:scale-105
              group-hover:bg-cyan-500/20
              group-hover:ring-cyan-400/30
            "
          >
            <Icon size={22} />
          </div>

          <div className="text-left">
            <h3 className="text-[15px] font-medium tracking-wide text-zinc-100 transition-colors group-hover:text-white">
              {name}
            </h3>

            <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500 transition-colors group-hover:text-zinc-300">
              <div className="flex items-center gap-1">
                <Building size={15} />
                <span>{building}</span>
              </div>

              <div className="h-1 w-1 rounded-full bg-zinc-700 group-hover:bg-zinc-500" />

              <div className="flex items-center gap-1">
                <Layers3 size={15} />
                <span>{floor}</span>
              </div>
            </div>
          </div>
        </div>

        <SquareArrowOutUpRight
          size={18}
          className="text-zinc-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-300"
        />
      </div>
    </button>
  );
};

export default LabCard;
