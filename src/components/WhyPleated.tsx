import { whyItems } from "../data/content";
import { Reveal } from "./Reveal";

export function WhyPleated() {
  return (
    <section id="termekek" className="scroll-mt-20 bg-white">
      <div className="mx-auto max-w-[1120px] px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="text-[12px] font-medium tracking-[0.16em] text-mute uppercase">Miért pliszé?</p>
          <h2 className="mt-3 max-w-[640px] text-[32px] leading-[1.08] font-semibold tracking-[-0.035em] md:text-[40px]">
            Nem egy extra tárgy. A nyílászáró része.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {whyItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <img
                src={item.image}
                alt=""
                className="aspect-square w-full rounded-[12px] object-cover"
              />
              <h3 className="mt-4 text-[17px] leading-snug font-semibold tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-mute">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
