import { frameColors } from "../config/colors";
import type { ColorId } from "../types";

export function ColorSelector({
  value,
  onChange,
}: {
  value: ColorId;
  onChange: (id: ColorId) => void;
}) {
  return (
    <div>
      <h3 className="text-[13px] font-semibold tracking-[0.12em] text-mute uppercase">Keretszín</h3>
      <div className="mt-5 grid grid-cols-3 gap-x-4 gap-y-5 sm:grid-cols-6">
        {frameColors.map((color) => {
          const active = color.id === value;
          return (
            <button
              key={color.id}
              type="button"
              onClick={() => onChange(color.id)}
              className="flex flex-col items-center gap-2"
            >
              <span
                className={`block h-11 w-11 rounded-full ${active ? "ring-2 ring-gold ring-offset-2" : "ring-1 ring-line"}`}
                style={{ background: `linear-gradient(135deg, ${color.hex}, ${color.metal})` }}
              />
              <span className={`text-[12px] ${active ? "font-medium text-ink" : "text-mute"}`}>
                {color.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
