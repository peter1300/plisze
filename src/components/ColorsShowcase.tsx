import { useState } from "react";
import { frameColors } from "../config/colors";
import { PleatedScreenVisual } from "./PleatedScreenVisual";
import { Reveal } from "./Reveal";
import type { ColorId } from "../types";

export function ColorsShowcase() {
  const [colorId, setColorId] = useState<ColorId>("anthracite");
  const selected = frameColors.find((c) => c.id === colorId) ?? frameColors[1];

  return (
    <section id="szinek" className="scroll-mt-20 bg-sage">
      <div className="mx-auto max-w-[1120px] px-5 py-20 md:px-8 md:py-28">
        <Reveal className="max-w-[560px]">
          <p className="text-[13px] tracking-[0.18em] text-mute uppercase">Színek</p>
          <h2 className="mt-3 text-[34px] leading-[1.08] font-semibold tracking-[-0.03em] md:text-[48px]">
            A keret a nyílászáróhoz igazodik.
          </h2>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="h-[52vh] min-h-[380px] overflow-hidden rounded-3xl bg-sage">
            <PleatedScreenVisual
              coverage={0.68}
              colorId={colorId}
              productType="single"
              opening="ltr"
              widthMm={1400}
              heightMm={2150}
              scene="interior"
              fill
              className="h-full w-full"
            />
          </div>
          <div>
            <p className="text-[22px] font-semibold tracking-tight">{selected.name}</p>
            <p className="mt-2 text-[15px] text-mute">{selected.description}</p>
            <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {frameColors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColorId(c.id)}
                  className={`rounded-2xl px-3 py-3 text-left transition ${colorId === c.id ? "bg-leaf text-white" : "bg-sand"}`}
                >
                  <span
                    className="mb-3 block h-10 w-full rounded-xl"
                    style={{ background: `linear-gradient(135deg, ${c.hex}, ${c.metal})` }}
                  />
                  <span className="text-[13px] font-medium">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
