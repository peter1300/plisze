import { getColor } from "../config/colors";
import { photos } from "../data/content";
import { useConfiguratorStore } from "../store/useConfiguratorStore";
import { ColorSelector } from "./ColorSelector";
import { DimensionInputs } from "./DimensionInputs";
import { PleatedPreview } from "./PleatedPreview";

export function ColorSizeSection() {
  const store = useConfiguratorStore();
  const color = getColor(store.colorId);

  return (
    <section id="szinek" className="scroll-mt-20 bg-surface">
      <div className="mx-auto max-w-[1120px] px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <ColorSelector value={store.colorId} onChange={store.setColor} />
            <div className="mt-8 overflow-hidden rounded-[16px]">
              <PleatedPreview
                photo={photos.hero}
                coverage={0.58}
                colorHex={color.hex}
                className="aspect-[16/10] w-full"
              />
            </div>
          </div>
          <DimensionInputs
            width={store.width}
            height={store.height}
            productType={store.productType}
            onWidth={store.setWidth}
            onHeight={store.setHeight}
          />
        </div>
      </div>
    </section>
  );
}
