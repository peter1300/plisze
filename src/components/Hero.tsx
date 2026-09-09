import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { photos } from "../data/content";
import { useConfiguratorStore } from "../store/useConfiguratorStore";
import { BenefitGrid } from "./BenefitGrid";
import { PleatedPreview } from "./PleatedPreview";
import { ButtonLink } from "./ui/Button";

export function Hero() {
  const startFresh = useConfiguratorStore((s) => s.startFresh);
  const [coverage, setCoverage] = useState(0.38);
  const [hint, setHint] = useState(true);

  const onCoverageChange = (value: number) => {
    setCoverage(value);
    if (hint) setHint(false);
  };

  return (
    <section className="overflow-x-hidden bg-white">
      <div className="relative">
        <div className="relative z-[1] mx-auto max-w-[1120px] px-5 pt-10 pb-8 md:px-8 md:pt-16 lg:min-h-[560px] lg:pt-20 lg:pb-12">
          <div className="max-w-[520px]">
            <p className="text-[12px] font-medium tracking-[0.16em] text-mute uppercase">
              Tiszta levegő. Nyugodt otthon.
            </p>
            <h1 className="mt-4 text-[40px] leading-[1.05] font-semibold tracking-[-0.04em] text-ink sm:text-[52px] lg:text-[56px]">
              Szúnyogháló, ami akkor van ott, amikor szükséged van rá.
            </h1>
            <p className="mt-5 max-w-[400px] text-[16px] leading-relaxed text-mute md:text-[17px]">
              Egyedi méretre gyártott pliszé szúnyoghálók ajtókra és ablakokra.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink
                to="/konfigurator"
                onClick={() => startFresh()}
                className="w-full !rounded-full px-6 sm:w-auto"
              >
                Kiszámolom az árat
                <ArrowRight size={16} strokeWidth={1.8} />
              </ButtonLink>
              <ButtonLink
                to="#hogyan-mukodik"
                variant="secondary"
                className="w-full !rounded-full px-6 sm:w-auto"
              >
                Hogyan működik?
              </ButtonLink>
            </div>
          </div>
        </div>

        <div className="relative h-[46vh] min-h-[300px] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:left-[44%] lg:h-auto lg:min-h-0">
          <PleatedPreview
            photo={photos.demo}
            coverage={coverage}
            onCoverageChange={onCoverageChange}
            interactive
            showFrame={false}
            inset={{ top: 10, right: 4, bottom: 14, left: 6 }}
            alt="Húzd el a pliszé szúnyoghálót a teraszajtón"
            className="hero-bleed h-full w-full"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[22%] bg-gradient-to-r from-white from-10% via-white/55 to-transparent lg:w-[30%]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-white to-transparent lg:hidden" />
          {hint && (
            <p className="pointer-events-none absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/92 px-4 py-2 text-[13px] font-medium text-ink shadow-[0_6px_20px_rgba(0,0,0,0.12)]">
              Húzd el a szúnyoghálót
            </p>
          )}
        </div>
      </div>
      <BenefitGrid />
    </section>
  );
}
