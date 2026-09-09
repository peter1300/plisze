import { Reveal } from "./Reveal";

const stats = [
  { value: "2", unit: "év", label: "Gyártási garancia keretre és mechanikára." },
  { value: "10–14", unit: "nap", label: "Gyártási idő a megrendelés után." },
  { value: "4", unit: "m", label: "Maximális nyílásszélesség kétszárnyú kivitelben." },
  { value: "100%", unit: "", label: "Egyedi méret. Nincs raktári standard." },
] as const;

export function ProofStats() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="text-[12px] font-semibold tracking-[0.18em] text-mute uppercase">Miért pliszé?</p>
          <h2 className="display mt-3 max-w-[720px] text-[36px] md:text-[52px]">
            Nem ígéret. <strong>Mérhető minőség.</strong>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <p className="display text-[56px] leading-none md:text-[64px]">
                {s.value}
                {s.unit ? (
                  <span className="ml-1 text-[22px] font-light tracking-normal text-gold">{s.unit}</span>
                ) : null}
              </p>
              <p className="mt-4 max-w-[220px] text-[14px] font-light leading-relaxed text-mute">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
