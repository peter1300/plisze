import { ArrowRight, MapPin, Shield, Ruler, Clock } from "lucide-react";
import { photos } from "../data/content";
import { useConfiguratorStore } from "../store/useConfiguratorStore";
import { ButtonLink } from "./ui/Button";

const trust = [
  { Icon: Ruler, label: "Egyedi méretre" },
  { Icon: Clock, label: "10–14 munkanap" },
  { Icon: Shield, label: "2 év garancia" },
];

export function Hero() {
  const startFresh = useConfiguratorStore((s) => s.startFresh);

  return (
    <section className="relative min-h-[86vh] overflow-hidden bg-ink">
      <img
        src={photos.hero}
        alt="Luxus teraszajtó pliszé szúnyoghálóval"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/15" />

      <div className="relative z-10 mx-auto flex min-h-[86vh] max-w-[1280px] flex-col justify-end px-5 pt-24 pb-12 md:px-8 md:pb-16">
        <p className="text-[12px] font-semibold tracking-[0.2em] text-gold uppercase">
          Pliszé · egyedi méretre
        </p>
        <h1 className="display mt-4 max-w-[820px] text-[44px] text-white sm:text-[64px] lg:text-[80px]">
          Maradandó <strong>nyugalom</strong>
        </h1>
        <p className="mt-5 max-w-[480px] text-[16px] leading-relaxed font-light text-white/85 md:text-[18px]">
          Egyedi méretre gyártott pliszé szúnyoghálók ajtókra és ablakokra. Prémium alumínium, hosszú távra.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink to="/konfigurator" onClick={() => startFresh()}>
            Árkalkuláció
            <ArrowRight size={16} strokeWidth={2.4} />
          </ButtonLink>
          <ButtonLink to="#hogyan-mukodik" variant="ghost">
            <MapPin size={14} strokeWidth={2.2} />
            Hogyan működik?
          </ButtonLink>
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          {trust.map(({ Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full bg-black/45 px-4 py-2 text-[12px] font-medium text-white backdrop-blur-md"
            >
              <Icon size={14} className="text-gold" strokeWidth={2} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
