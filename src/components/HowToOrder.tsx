import { Reveal } from "./Reveal";

const steps = [
  { n: "01", title: "Mérd le", text: "Három ponton, milliméterben. A legkisebb számot add meg." },
  { n: "02", title: "Állítsd össze", text: "Típus, nyitás, méret, szín. Az ár azonnal látszik." },
  { n: "03", title: "Rendeld meg", text: "Kapcsolat, szállítás, fizetés. Négy rövid lépés." },
  { n: "04", title: "Mi elkészítjük", text: "Pont a te nyílásodra. 10–14 munkanap." },
];

export function HowToOrder() {
  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-[1120px] px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="text-[13px] tracking-[0.18em] text-mute uppercase">Hogyan rendelhetsz?</p>
          <h2 className="mt-3 max-w-[520px] text-[34px] leading-[1.08] font-semibold tracking-[-0.03em] md:text-[48px]">
            Négy lépés. Semmi szakértelem.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <p className="text-[13px] tracking-[0.16em] text-leaf">{s.n}</p>
              <h3 className="mt-4 text-[28px] leading-tight font-semibold tracking-[-0.03em]">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-mute">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
