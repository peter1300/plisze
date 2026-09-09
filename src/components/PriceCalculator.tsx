import { openingLabel, productLabel } from "../config/products";
import { getColor } from "../config/colors";
import { calculatePrice, formatSize } from "../lib/calculatePrice";
import type { ProductConfig } from "../types";
import { AnimatedPrice } from "./AnimatedPrice";

export function PriceCalculator({
  config,
  onAdd,
  editing,
  compact = false,
}: {
  config: ProductConfig;
  onAdd: () => void;
  editing: boolean;
  compact?: boolean;
}) {
  const price = calculatePrice(config);
  const color = getColor(config.colorId);

  if (compact) {
    return (
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[18px] font-semibold tracking-tight">
            <AnimatedPrice value={price.total} />
          </p>
          <p className="text-[11px] text-mute">ÁFÁ-val</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex h-11 items-center rounded-full bg-leaf px-5 text-[14px] font-medium text-white transition hover:bg-leaf-deep"
        >
          {editing ? "Mentés" : "Kosárba"}
        </button>
      </div>
    );
  }

  return (
    <div className="border-t border-line pt-6 lg:border-t-0 lg:pt-8">
      <p className="text-[12px] tracking-[0.14em] text-mute uppercase">Az Ön pliszé szúnyoghálója</p>
      <p className="mt-3 text-[15px] text-mute">
        {formatSize(config.width, config.height)}
        <br />
        {productLabel(config.productType)}
        <br />
        {color.name}
        <br />
        {openingLabel(config.opening)}
      </p>
      <p className="mt-5 text-[34px] leading-none font-semibold tracking-[-0.03em]">
        <AnimatedPrice value={price.total} />
      </p>
      <p className="mt-2 text-[13px] text-mute">Az ár tartalmazza az ÁFÁ-t.</p>
      <button
        type="button"
        onClick={onAdd}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-leaf text-[15px] font-medium text-white transition hover:bg-leaf-deep"
      >
        {editing ? "Módosítások mentése" : "Kosárba teszem"}
      </button>
    </div>
  );
}
