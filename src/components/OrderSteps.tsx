import { ArrowRight } from "lucide-react";
import { orderSteps } from "../data/content";
import { Reveal } from "./Reveal";

export function OrderSteps() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1120px] px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="text-[12px] font-medium tracking-[0.16em] text-mute uppercase">Hogyan rendelhetsz?</p>
          <h2 className="mt-3 max-w-[520px] text-[32px] leading-[1.08] font-semibold tracking-[-0.035em] md:text-[40px]">
            Négy lépés. Semmi szakértelem.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {orderSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <img src={s.image} alt="" className="aspect-[4/3] w-full rounded-[12px] object-cover" />
              <p className="mt-5 text-[28px] font-semibold tracking-[-0.04em] text-ink">{s.n}</p>
              <h3 className="mt-1 text-[18px] font-semibold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-mute">{s.text}</p>
            </Reveal>
          ))}
        </div>

        <a
          href="#hogyan-merjek"
          className="mt-10 inline-flex items-center gap-1.5 text-[15px] font-medium text-ink"
        >
          Részletes útmutató
          <ArrowRight size={16} strokeWidth={1.8} />
        </a>
      </div>
    </section>
  );
}
