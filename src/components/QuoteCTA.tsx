import { ArrowRight } from "lucide-react";
import { photos } from "../data/content";
import { useConfiguratorStore } from "../store/useConfiguratorStore";
import { Reveal } from "./Reveal";
import { ButtonLink } from "./ui/Button";

export function QuoteCTA() {
  const startFresh = useConfiguratorStore((s) => s.startFresh);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-5 pb-20 md:px-8 md:pb-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px]">
            <img
              src={photos.galleryDusk}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-ink/75" />
            <div className="relative px-8 py-16 text-white md:px-16 md:py-24">
              <p className="text-[12px] font-semibold tracking-[0.18em] text-gold uppercase">Ha készen állsz</p>
              <h2 className="display mt-4 max-w-[640px] text-[36px] md:text-[56px]">
                Tervezd meg a <strong>pliszédet.</strong>
              </h2>
              <p className="mt-4 max-w-[440px] text-[16px] font-light leading-relaxed text-white/75">
                Azonnali ár a méret és a szín alapján. Nincs spam, nincs nyomulás — csak átlátható kalkuláció.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-[12px] font-medium text-white/80">
                <span className="rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">Azonnali ár</span>
                <span className="rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">10–14 munkanap</span>
                <span className="rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">2 év garancia</span>
              </div>
              <ButtonLink to="/konfigurator" onClick={() => startFresh()} className="mt-8 w-fit">
                Árkalkuláció
                <ArrowRight size={16} strokeWidth={2.4} />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
