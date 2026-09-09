import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { getColor } from "../config/colors";
import { openingLabel, productLabel } from "../config/products";
import { formatSize } from "../lib/calculatePrice";
import type { ColorId, OpeningMode, ProductType } from "../types";
import { PleatedScreenVisual } from "./PleatedScreenVisual";

export function ProductPreview({
  coverage,
  onCoverageChange,
  colorId,
  productType,
  opening,
  width,
  height,
  collapsible = false,
}: {
  coverage: number;
  onCoverageChange: (v: number) => void;
  colorId: ColorId;
  productType: ProductType;
  opening: OpeningMode;
  width: number;
  height: number;
  collapsible?: boolean;
}) {
  const [open, setOpen] = useState(true);
  const color = getColor(colorId);

  const visual = (
    <div className="overflow-hidden bg-wash">
      <PleatedScreenVisual
        coverage={coverage}
        colorId={colorId}
        productType={productType}
        opening={opening}
        widthMm={width}
        heightMm={height}
        scene="minimal"
        interactive
        onCoverageChange={onCoverageChange}
      />
    </div>
  );

  if (collapsible) {
    return (
      <div className="border-b border-line lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between px-5 py-4 text-left"
        >
          <span className="text-[14px] font-medium">
            Előnézet · {productLabel(productType)} · {color.name}
          </span>
          <ChevronDown
            size={18}
            className={`transition ${open ? "rotate-180" : ""}`}
            strokeWidth={1.6}
          />
        </button>
        {open && (
          <div className="px-3 pb-4">
            {visual}
            <p className="mt-2 text-center text-[12px] text-mute">
              {formatSize(width, height)} · {openingLabel(opening)}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="sticky top-24">
      {visual}
      <div className="mt-4 flex items-center justify-between text-[13px] text-mute">
        <span>
          {productLabel(productType)} · {color.name}
        </span>
        <span>{formatSize(width, height)}</span>
      </div>
      <p className="mt-1 text-[12px] text-mute">Húzd a fogantyút a nyitáshoz.</p>
    </div>
  );
}
