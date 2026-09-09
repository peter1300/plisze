import { useNavigate } from "react-router-dom";
import { productTypes } from "../config/products";
import { useConfiguratorStore } from "../store/useConfiguratorStore";
import type { ProductType } from "../types";
import { PleatedScreenVisual } from "./PleatedScreenVisual";
import { Reveal } from "./Reveal";

const previews: Record<
  ProductType,
  { width: number; height: number; opening: "ltr" | "center"; type: ProductType }
> = {
  single: { width: 1200, height: 2150, opening: "ltr", type: "single" },
  double: { width: 2800, height: 2200, opening: "center", type: "double" },
  window: { width: 1200, height: 1400, opening: "ltr", type: "window" },
};

export function ProductSelector() {
  const navigate = useNavigate();
  const startFresh = useConfiguratorStore((s) => s.startFresh);

  const choose = (id: ProductType) => {
    startFresh(id);
    navigate("/konfigurator");
  };

  return (
    <section id="termekek" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10">
        <Reveal className="max-w-[700px]">
          <p className="text-[13px] tracking-[0.2em] text-mute uppercase">Típus</p>
          <h2 className="mt-4 text-[40px] leading-[1.04] font-semibold tracking-[-0.04em] md:text-[56px]">
            Három forma. Egy specialistája.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {productTypes.map((product, i) => {
            const preview = previews[product.id];
            return (
              <Reveal key={product.id} delay={i * 0.06}>
                <button
                  type="button"
                  onClick={() => choose(product.id)}
                  className="group w-full text-left"
                >
                  <div className={`h-[320px] overflow-hidden rounded-3xl md:h-[380px] ${
                    i === 0 ? "bg-sage" : i === 1 ? "bg-sand" : "bg-sky"
                  }`}>
                    <PleatedScreenVisual
                      coverage={0.7}
                      colorId="anthracite"
                      productType={preview.type}
                      opening={preview.opening}
                      widthMm={preview.width}
                      heightMm={preview.height}
                      scene="interior"
                      fill
                      className="h-full w-full"
                    />
                  </div>
                  <h3 className="mt-6 text-[24px] leading-tight font-semibold tracking-[-0.03em]">
                    {product.short}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-mute">{product.description}</p>
                  <span className="mt-5 inline-block text-[15px] underline decoration-line underline-offset-8 group-hover:decoration-ink">
                    Ezzel tervezek
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
