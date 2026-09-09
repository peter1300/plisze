import { ArrowRight } from "lucide-react";
import { orderSteps } from "../data/content";
import { Reveal } from "./Reveal";

export function OrderSteps() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="text-[12px] font-semibold tracking-[0.18em] text-mute uppercase">Hogyan rendelhetsz?</p>
          <h2 className="display mt-3 max-w-[640px] text-[36px] md:text-[52px]">
            Négy lépés. <strong>Semmi szakértelem.</strong>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {orderSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <img src={s.image} alt="" className="aspect-[4/3] w-full rounded-[24px] object-cover" />
              <p className="mt-5 text-[28px] font-black tracking-[-0.04em] text-gold">{s.n}</p>
              <h3 className="mt-1 text-[18px] font-bold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-2 text-[14px] font-light leading-relaxed text-mute">{s.text}</p>
            </Reveal>
          ))}
        </div>

        <a
          href="#hogyan-merjek"
          className="mt-10 inline-flex items-center gap-1.5 text-[12px] font-black tracking-[0.08em] text-ink uppercase"
        >
          Részletes útmutató
          <ArrowRight size={16} strokeWidth={2.2} />
        </a>
      </div>
    </section>
  );
}
