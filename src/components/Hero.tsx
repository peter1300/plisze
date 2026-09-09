import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { photos } from "../data/content";
import { useConfiguratorStore } from "../store/useConfiguratorStore";
import { BenefitGrid } from "./BenefitGrid";
import { PleatedPreview } from "./PleatedPreview";
import { ButtonLink } from "./ui/Button";

export function Hero() {
  const startFresh = useConfiguratorStore((s) => s.startFresh);
  const [coverage, setCoverage] = useState(0.42);
  const [hint, setHint] = useState(true);

  const onCoverageChange = (value: number) => {
    setCoverage(value);
    if (hint) setHint(false);
  };

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1120px] items-center gap-10 px-5 pt-10 pb-8 md:px-8 md:pt-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:pt-20">
        <div>
          <p className="text-[12px] font-medium tracking-[0.16em] text-mute uppercase">
            Tiszta levegő. Nyugodt otthon.
          </p>
          <h1 className="mt-4 text-[40px] leading-[1.05] font-semibold tracking-[-0.04em] text-ink sm:text-[52px] lg:text-[56px]">
            Szúnyogháló, ami akkor van ott, amikor szükséged van rá.
          </h1>
          <p className="mt-5 max-w-[420px] text-[16px] leading-relaxed text-mute md:text-[17px]">
            Egyedi méretre gyártott pliszé szúnyoghálók ajtókra és ablakokra.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink to="/konfigurator" onClick={() => startFresh()} className="w-full sm:w-auto">
              Kiszámolom az árat
              <ArrowRight size={16} strokeWidth={1.8} />
            </ButtonLink>
            <ButtonLink to="#hogyan-mukodik" variant="secondary" className="w-full sm:w-auto">
              Hogyan működik?
            </ButtonLink>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[16px]">
          <PleatedPreview
            photo={photos.demo}
            coverage={coverage}
            onCoverageChange={onCoverageChange}
            interactive
            showFrame={false}
            inset={{ top: 11, right: 7, bottom: 16, left: 8 }}
            alt="Húzd el a pliszé szúnyoghálót a teraszajtón"
            className="aspect-[4/3] h-auto w-full lg:aspect-[5/4]"
          />
          {hint && (
            <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/92 px-4 py-2 text-[13px] font-medium text-ink shadow-[0_6px_20px_rgba(0,0,0,0.12)]">
              Húzd el a szúnyoghálót
            </p>
          )}
        </div>
      </div>
      <BenefitGrid />
    </section>
  );
}
