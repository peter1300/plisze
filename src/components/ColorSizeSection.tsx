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
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-8 md:py-24">
        <p className="text-[12px] font-semibold tracking-[0.18em] text-mute uppercase">Szín és méret</p>
        <h2 className="display mt-3 max-w-[640px] text-[36px] md:text-[48px]">
          A keret a te <strong>otthonodhoz.</strong>
        </h2>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <ColorSelector value={store.colorId} onChange={store.setColor} />
            <div className="mt-8 overflow-hidden rounded-[28px]">
              <PleatedPreview
                photo={photos.heroEmpty}
                netPhoto={photos.heroNetted}
                inset={{ top: 14.5, right: 35.5, bottom: 16.5, left: 40.5 }}
                coverage={0.58}
                colorHex={color.hex}
                showFrame={false}
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
