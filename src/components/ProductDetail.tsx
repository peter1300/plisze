import { Play } from "lucide-react";
import { photos } from "../data/content";
import { Reveal } from "./Reveal";

export function ProductDetail() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1120px] items-center gap-10 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <p className="text-[12px] font-medium tracking-[0.16em] text-white/45 uppercase">
            Anyag
          </p>
          <h2 className="mt-3 text-[32px] leading-[1.08] font-semibold tracking-[-0.035em] md:text-[40px]">
            Apró részletek. Nagy különbség.
          </h2>
          <p className="mt-5 max-w-[400px] text-[16px] leading-relaxed text-white/60">
            Üvegszál-erősítésű pliszélt háló, precíz alumínium keret. A redők tartják a feszítést — rugó nélkül.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <a href="#hogyan-mukodik" className="relative block overflow-hidden rounded-[16px]">
            <img src={photos.mesh} alt="Pliszé háló makró" className="aspect-[16/9] w-full object-cover" />
            <span className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
              <Play size={22} fill="currentColor" className="ml-0.5" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
