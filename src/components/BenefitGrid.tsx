import { Award, Clock, Ruler, Shield } from "lucide-react";
import { benefits } from "../data/content";

const icons = [Ruler, Award, Clock, Shield];

export function BenefitGrid() {
  return (
    <div className="relative z-10 bg-white">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-x-8 gap-y-4 px-5 py-7 md:justify-between md:px-8 md:py-8">
        {benefits.map((item, i) => {
          const Icon = icons[i];
          const last = i === benefits.length - 1;
          return (
            <div
              key={item.title}
              className={`flex items-center gap-2.5 ${last ? "rounded-full bg-surface px-4 py-2" : ""}`}
            >
              <Icon size={18} strokeWidth={1.6} className="shrink-0 text-ink" />
              <p className="text-[14px] font-medium text-ink">{item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
