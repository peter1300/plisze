import { whyItems } from "../data/content";
import { Reveal } from "./Reveal";

export function WhyPleated() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="text-[12px] font-semibold tracking-[0.18em] text-mute uppercase">Miért pliszé?</p>
          <h2 className="display mt-3 max-w-[720px] text-[36px] md:text-[52px]">
            Nem extra tárgy. <strong>A nyílászáró része.</strong>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="overflow-hidden rounded-[28px] bg-surface">
                <div className="relative">
                  <img src={item.image} alt="" className="aspect-[4/3] w-full object-cover" />
                  <span className="absolute top-3 left-3 rounded-full bg-black/45 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-md">
                    {item.label}
                  </span>
                </div>
                <div className="px-5 py-5">
                  <h3 className="text-[17px] leading-snug font-bold tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-2 text-[14px] font-light leading-relaxed text-mute">{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
