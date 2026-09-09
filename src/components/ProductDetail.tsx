import { Play } from "lucide-react";
import { photos } from "../data/content";
import { Reveal } from "./Reveal";

export function ProductDetail() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="text-[12px] font-semibold tracking-[0.18em] text-gold uppercase">Technológia</p>
          <h2 className="display mt-3 text-[34px] md:text-[48px]">
            A design mögött <strong>anyag van.</strong>
          </h2>
          <p className="mt-5 max-w-[420px] text-[16px] font-light leading-relaxed text-white/65">
            Üvegszál-erősítésű pliszélt háló, precíz alumínium keret. A redők tartják a feszítést — rugó nélkül.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <a href="#hogyan-mukodik" className="relative block overflow-hidden rounded-[28px]">
            <img src={photos.mesh} alt="Pliszé háló makró" className="aspect-[16/9] w-full object-cover" />
            <span className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-ink shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
              <Play size={22} fill="currentColor" className="ml-0.5" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
