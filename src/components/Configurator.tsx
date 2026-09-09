import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getColor } from "../config/colors";
import { openingLabel, openingModes, placementLabel, productLabel } from "../config/products";
import { photos } from "../data/content";
import { calculatePrice, formatSize } from "../lib/calculatePrice";
import { useCartStore } from "../store/useCartStore";
import { useConfiguratorStore } from "../store/useConfiguratorStore";
import type { ConfiguratorStep, OpeningMode } from "../types";
import { AnimatedPrice } from "./AnimatedPrice";
import { ColorSelector } from "./ColorSelector";
import { DimensionInputs } from "./DimensionInputs";
import { PleatedPreview } from "./PleatedPreview";
import { ProductTypeSelector } from "./ProductTypeSelector";
import { Button, ButtonLink } from "./ui/Button";

const stepCopy: Record<ConfiguratorStep, { kicker: string; title: string }> = {
  1: { kicker: "1/5", title: "Hova szeretnéd?" },
  2: { kicker: "2/5", title: "Merre nyílik?" },
  3: { kicker: "3/5", title: "Mekkora a nyílás?" },
  4: { kicker: "4/5", title: "Milyen keretszín?" },
  5: { kicker: "5/5", title: "Ellenőrizd a rendelést" },
};

export function Configurator({ standalone = false }: { standalone?: boolean }) {
  const navigate = useNavigate();
  const store = useConfiguratorStore();
  const addItem = useCartStore((s) => s.addItem);
  const updateItem = useCartStore((s) => s.updateItem);
  const [added, setAdded] = useState(false);

  const config = useMemo(
    () => ({
      productType: store.productType,
      placement: store.placement,
      opening: store.opening,
      width: store.width,
      height: store.height,
      colorId: store.colorId,
    }),
    [store.productType, store.placement, store.opening, store.width, store.height, store.colorId],
  );

  const price = calculatePrice(config);
  const color = getColor(config.colorId);
  const copy = stepCopy[store.step];
  const previewPhoto =
    config.placement === "window"
      ? photos.galleryWhite
      : photos.heroEmpty;
  const netPhoto = config.placement === "window" ? undefined : photos.heroNetted;
  const previewInset =
    config.placement === "window" ? undefined : { top: 14.5, right: 35.5, bottom: 16.5, left: 40.5 };

  const openings = openingModes.filter((o) => o.for.includes(config.productType));

  const addToCart = () => {
    if (store.editingId) {
      updateItem(store.editingId, config);
      navigate("/kosar");
      return;
    }
    addItem(config);
    setAdded(true);
  };

  const next = () => store.setStep(Math.min(5, store.step + 1) as ConfiguratorStep);
  const back = () => store.setStep(Math.max(1, store.step - 1) as ConfiguratorStep);

  return (
    <section
      id="konfigurator"
      className={`scroll-mt-20 bg-surface ${standalone ? "min-h-[calc(100svh-4rem)]" : ""}`}
    >
      <div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[0.92fr_1.18fr] lg:gap-12 lg:py-24">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.18em] text-mute uppercase">Konfigurátor</p>
          <h2 className="display mt-3 text-[32px] md:text-[44px]">
            Tervezd meg. <strong>Lásd az árat.</strong>
          </h2>
          <p className="mt-3 max-w-[420px] text-[15px] font-light leading-relaxed text-mute">
            Öt lépés. A jobb oldali előnézet és az ár azonnal követi a választásaidat.
          </p>

          <div className="mt-8 mb-6">
            <div className="mb-2 flex items-center justify-between text-[13px] text-mute">
              <span>{copy.kicker}</span>
              <button type="button" onClick={() => store.startFresh()} className="hover:text-ink">
                {store.editingId ? "Módosítás" : "Új tervezés"}
              </button>
            </div>
            <div className="h-[3px] overflow-hidden rounded-full bg-line">
              <div
                className="h-full bg-gold transition-[width] duration-300"
                style={{ width: `${(store.step / 5) * 100}%` }}
              />
            </div>
          </div>

          <h3 className="text-[22px] font-bold tracking-[-0.03em]">{copy.title}</h3>

          <AnimatePresence mode="wait">
            <motion.div
              key={store.step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="mt-6"
            >
              {store.step === 1 && (
                <ProductTypeSelector value={store.placement} onChange={store.setPlacement} />
              )}
              {store.step === 2 && (
                <div className="space-y-3">
                  {openings.map((opt) => {
                    const active = store.opening === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => store.setOpening(opt.id as OpeningMode)}
                        className={`w-full rounded-[20px] border bg-white px-5 py-4 text-left transition ${
                          active ? "border-gold shadow-[0_0_0_1px_#ffb00b]" : "border-line hover:border-[#d2d2d7]"
                        }`}
                      >
                        <span className="block text-[16px] font-medium">{opt.name}</span>
                        <span className="mt-1 block text-[13px] text-mute">{opt.description}</span>
                      </button>
                    );
                  })}
                </div>
              )}
              {store.step === 3 && (
                <DimensionInputs
                  width={store.width}
                  height={store.height}
                  productType={store.productType}
                  onWidth={store.setWidth}
                  onHeight={store.setHeight}
                />
              )}
              {store.step === 4 && (
                <ColorSelector value={store.colorId} onChange={store.setColor} />
              )}
              {store.step === 5 && (
                <ul className="space-y-2 text-[15px] text-mute">
                  <li>
                    <span className="text-ink">{placementLabel(config.placement)}</span> · {productLabel(config.productType)}
                  </li>
                  <li>{openingLabel(config.opening)}</li>
                  <li>{formatSize(config.width, config.height)}</li>
                  <li>{color.name} keret</li>
                </ul>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={back}
              disabled={store.step === 1}
              className="text-[14px] text-mute disabled:opacity-25"
            >
              Vissza
            </button>
            {store.step < 5 ? (
              <Button onClick={next}>
                Tovább
                <ArrowRight size={16} strokeWidth={1.8} />
              </Button>
            ) : (
              <Button onClick={addToCart}>
                {store.editingId ? "Módosítások mentése" : "Kosárba teszem"}
              </Button>
            )}
          </div>
        </div>

        <div className="relative order-first min-h-[280px] overflow-hidden rounded-[28px] lg:order-last lg:min-h-[560px]">
          <PleatedPreview
            photo={previewPhoto}
            netPhoto={netPhoto}
            inset={previewInset}
            coverage={store.coverage}
            onCoverageChange={store.setCoverage}
            interactive
            showFrame={config.placement === "window"}
            colorHex={color.hex}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute right-4 bottom-4 w-[min(100%-2rem,240px)] rounded-[20px] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <p className="text-[12px] leading-snug text-mute">
              {placementLabel(config.placement)} · {productLabel(config.productType)}
              <br />
              {formatSize(config.width, config.height)} · {color.name}
            </p>
            <p className="mt-3 text-[26px] leading-none font-black tracking-[-0.03em]">
              <AnimatedPrice value={price.total} />
            </p>
            <p className="mt-1 text-[11px] text-mute">ÁFÁ-val</p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {added && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 px-5"
          >
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-[400px] rounded-[28px] bg-white px-8 py-10 text-center"
            >
              <p className="display text-[28px]">A kosárban <strong>van.</strong></p>
              <p className="mt-3 text-[15px] text-mute">Folytathatod a tervezést, vagy megrendelheted.</p>
              <div className="mt-8 flex flex-col gap-3">
                <ButtonLink to="/kosar">Tovább a kosárhoz</ButtonLink>
                <button
                  type="button"
                  onClick={() => {
                    setAdded(false);
                    store.startFresh(store.productType);
                  }}
                  className="h-11 text-[15px] text-mute"
                >
                  Új szúnyogháló tervezése
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
