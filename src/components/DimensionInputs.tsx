import { pricing } from "../config/pricing";
import { maxWidthFor } from "../lib/calculatePrice";
import type { ProductType } from "../types";

export function DimensionInputs({
  width,
  height,
  productType,
  onWidth,
  onHeight,
}: {
  width: number;
  height: number;
  productType: ProductType;
  onWidth: (n: number) => void;
  onHeight: (n: number) => void;
}) {
  const maxW = maxWidthFor(productType);

  return (
    <div>
      <h3 className="text-[13px] font-medium tracking-[0.12em] text-mute uppercase">Méret</h3>
      <div className="mt-5 grid grid-cols-[1fr_auto] items-start gap-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-[13px] text-mute">Szélesség</span>
            <div className="mt-1.5 flex h-11 items-center rounded-[12px] border border-line bg-white px-3">
              <input
                type="number"
                inputMode="numeric"
                min={pricing.minimumWidth}
                max={maxW}
                value={width}
                onChange={(e) => onWidth(Number(e.target.value))}
                className="w-full bg-transparent text-[16px] outline-none"
              />
              <span className="text-[13px] text-mute">mm</span>
            </div>
          </label>
          <label className="block">
            <span className="text-[13px] text-mute">Magasság</span>
            <div className="mt-1.5 flex h-11 items-center rounded-[12px] border border-line bg-white px-3">
              <input
                type="number"
                inputMode="numeric"
                min={pricing.minimumHeight}
                max={pricing.maximumHeight}
                value={height}
                onChange={(e) => onHeight(Number(e.target.value))}
                className="w-full bg-transparent text-[16px] outline-none"
              />
              <span className="text-[13px] text-mute">mm</span>
            </div>
          </label>
        </div>
        <svg viewBox="0 0 92 140" className="mt-6 h-[120px] w-[64px] shrink-0 text-mute" aria-hidden>
          <rect x="22" y="16" width="48" height="108" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="22" y1="8" x2="70" y2="8" stroke="#1f8a7a" strokeWidth="1.6" />
          <polygon points="22,8 26,5 26,11" fill="#1f8a7a" />
          <polygon points="70,8 66,5 66,11" fill="#1f8a7a" />
          <line x1="12" y1="16" x2="12" y2="124" stroke="#1f8a7a" strokeWidth="1.6" />
          <polygon points="12,16 9,20 15,20" fill="#1f8a7a" />
          <polygon points="12,124 9,120 15,120" fill="#1f8a7a" />
        </svg>
      </div>
    </div>
  );
}
