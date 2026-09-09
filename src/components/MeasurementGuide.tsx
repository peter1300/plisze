import { useState } from "react";
import { measurePoints, measureTabs, photos } from "../data/content";

export function MeasurementGuide() {
  const [tab, setTab] = useState<(typeof measureTabs)[number]["id"]>("terrace");
  const [active, setActive] = useState(0);

  const markers = [
    { n: 1, x: "50%", y: "11%" },
    { n: 2, x: "50%", y: "48%" },
    { n: 3, x: "50%", y: "86%" },
    { n: 4, x: "18%", y: "50%" },
    { n: 5, x: "82%", y: "50%" },
  ];

  return (
    <section id="hogyan-merjek" className="scroll-mt-20 bg-white">
      <div className="mx-auto grid max-w-[1120px] items-start gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-[12px] font-medium tracking-[0.16em] text-mute uppercase">Mérés</p>
          <h2 className="mt-3 text-[32px] leading-[1.08] font-semibold tracking-[-0.035em] md:text-[40px]">
            Hogyan mérjek?
          </h2>
          <p className="mt-4 max-w-[420px] text-[16px] leading-relaxed text-mute">
            A nyílászáró ritkán tökéletesen derékszögű. Szélességet és magasságot is több helyen mérünk — mindig a legkisebb számot add meg.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {measureTabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`h-10 rounded-[10px] px-4 text-[14px] font-medium ${
                  tab === t.id ? "bg-ink text-white" : "bg-surface text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <ol className="mt-8 space-y-4">
            {measurePoints.map((p, i) => (
              <li key={p.n}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={`flex w-full items-start gap-3 text-left ${active === i ? "opacity-100" : "opacity-45 hover:opacity-80"}`}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-measure text-[12px] font-medium text-white">
                    {p.n}
                  </span>
                  <span>
                    <span className="block text-[15px] font-medium">{p.title}</span>
                    <span className="mt-0.5 block text-[13px] text-mute">{p.text}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative overflow-hidden rounded-[16px]">
          <img
            src={tab === "window" ? photos.galleryWindow : photos.measure}
            alt="Nyílászáró mérési pontokkal"
            className="aspect-[4/3] w-full object-cover"
          />
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="22" y1="12" x2="78" y2="12" stroke="#1f8a7a" strokeWidth="0.6" />
            <line x1="22" y1="48" x2="78" y2="48" stroke="#1f8a7a" strokeWidth="0.45" opacity="0.7" />
            <line x1="22" y1="86" x2="78" y2="86" stroke="#1f8a7a" strokeWidth="0.6" />
            <line x1="20" y1="12" x2="20" y2="86" stroke="#1f8a7a" strokeWidth="0.6" />
            <line x1="80" y1="12" x2="80" y2="86" stroke="#1f8a7a" strokeWidth="0.6" />
          </svg>
          {markers.map((m, i) => (
            <button
              key={m.n}
              type="button"
              onClick={() => setActive(i)}
              className={`absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[12px] font-semibold text-white shadow-sm ${
                active === i ? "scale-110 bg-ink" : "bg-measure"
              }`}
              style={{ left: m.x, top: m.y }}
            >
              {m.n}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
