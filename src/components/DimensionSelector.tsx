import { pricing } from "../config/pricing";
import { maxWidthFor } from "../lib/calculatePrice";
import type { ProductType } from "../types";

export function DimensionSelector({
  width,
  height,
  productType,
  onWidth,
  onHeight,
  onOpenGuide,
}: {
  width: number;
  height: number;
  productType: ProductType;
  onWidth: (n: number) => void;
  onHeight: (n: number) => void;
  onOpenGuide: () => void;
}) {
  const maxW = maxWidthFor(productType);

  return (
    <div>
      <h2 className="text-[32px] leading-[1.1] font-semibold tracking-[-0.035em] md:text-[36px]">
        Add meg a méretet
      </h2>
      <p className="mt-3 text-[15px] text-mute">Milliméterben, a nyílás belsejében.</p>

      <div className="mt-8 space-y-6">
        <div className="space-y-5">
          <label className="block">
            <span className="text-[12px] tracking-[0.12em] text-mute uppercase">Szélesség</span>
            <div className="mt-2 flex items-end border-b border-ink pb-2">
              <input
                type="number"
                inputMode="numeric"
                min={pricing.minimumWidth}
                max={maxW}
                value={width}
                onChange={(e) => onWidth(Number(e.target.value))}
                className="w-full bg-transparent text-[32px] font-medium tracking-tight outline-none"
              />
              <span className="pb-1 text-[14px] text-mute">mm</span>
            </div>
            <span className="mt-1 block text-[12px] text-mute">
              {pricing.minimumWidth}–{maxW} mm
            </span>
          </label>
          <label className="block">
            <span className="text-[12px] tracking-[0.12em] text-mute uppercase">Magasság</span>
            <div className="mt-2 flex items-end border-b border-ink pb-2">
              <input
                type="number"
                inputMode="numeric"
                min={pricing.minimumHeight}
                max={pricing.maximumHeight}
                value={height}
                onChange={(e) => onHeight(Number(e.target.value))}
                className="w-full bg-transparent text-[32px] font-medium tracking-tight outline-none"
              />
              <span className="pb-1 text-[14px] text-mute">mm</span>
            </div>
            <span className="mt-1 block text-[12px] text-mute">
              {pricing.minimumHeight}–{pricing.maximumHeight} mm
            </span>
          </label>
          <button
            type="button"
            onClick={onOpenGuide}
            className="text-[14px] underline decoration-line underline-offset-8 hover:decoration-ink"
          >
            Nem tudod, hogyan kell mérni?
          </button>
        </div>

        <svg viewBox="0 0 280 360" className="mx-auto mt-2 h-auto w-full max-w-[200px] opacity-80">
          <text x="140" y="22" textAnchor="middle" fontSize="11" fill="#6e6e73" fontFamily="Inter, sans-serif">
            SZÉLESSÉG
          </text>
          <line x1="48" y1="36" x2="232" y2="36" stroke="#1d1d1f" strokeWidth="1.4" />
          <polygon points="48,36 56,32 56,40" fill="#1d1d1f" />
          <polygon points="232,36 224,32 224,40" fill="#1d1d1f" />
          <rect x="48" y="48" width="184" height="280" fill="none" stroke="#1d1d1f" strokeWidth="5" />
          <line x1="32" y1="48" x2="32" y2="328" stroke="#1d1d1f" strokeWidth="1.4" />
          <polygon points="32,48 28,56 36,56" fill="#1d1d1f" />
          <polygon points="32,328 28,320 36,320" fill="#1d1d1f" />
          <text
            x="16"
            y="196"
            textAnchor="middle"
            fontSize="11"
            fill="#6e6e73"
            fontFamily="Inter, sans-serif"
            transform="rotate(-90 16 196)"
          >
            MAGASSÁG
          </text>
          <text x="140" y="198" textAnchor="middle" fontSize="13" fill="#1d1d1f" fontFamily="Inter, sans-serif">
            {width} × {height}
          </text>
        </svg>
      </div>
    </div>
  );
}
