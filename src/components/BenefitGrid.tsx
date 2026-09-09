import { Award, Clock, Ruler, Shield } from "lucide-react";
import { benefits } from "../data/content";

const icons = [Ruler, Award, Clock, Shield];

export function BenefitGrid() {
  return (
    <div className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-[1120px] grid-cols-2 md:grid-cols-4">
        {benefits.map((item, i) => {
          const Icon = icons[i];
          return (
            <div
              key={item.title}
              className={`flex items-start gap-3 px-5 py-6 md:px-8 ${i !== 0 ? "border-t border-line md:border-t-0 md:border-l" : ""}`}
            >
              <Icon size={18} strokeWidth={1.6} className="mt-0.5 shrink-0 text-ink" />
              <div>
                <p className="text-[14px] font-medium text-ink">{item.title}</p>
                <p className="mt-0.5 text-[13px] text-mute">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
