import { useState } from "react";
import { photos } from "../data/content";
import { PleatedPreview } from "./PleatedPreview";

export function PleatedDemo() {
  const [coverage, setCoverage] = useState(0.46);

  return (
    <section id="hogyan-mukodik" className="scroll-mt-16 bg-white">
      <div className="mx-auto max-w-[1120px] px-5 py-16 md:px-8 md:py-24">
        <p className="text-center text-[12px] font-medium tracking-[0.16em] text-mute uppercase">Működés</p>
        <h2 className="mx-auto mt-3 max-w-[560px] text-center text-[32px] leading-[1.08] font-semibold tracking-[-0.035em] md:text-[40px]">
          Húzd el. Nyisd ki. Zárd be.
        </h2>
        <div className="mt-10 overflow-hidden rounded-[16px]">
          <PleatedPreview
            photo={photos.demo}
            coverage={coverage}
            onCoverageChange={setCoverage}
            interactive
            className="aspect-[16/9] min-h-[280px] w-full md:min-h-[420px]"
          />
        </div>
        <p className="mt-4 text-center text-[14px] text-mute">Húzd a középső kört — a háló követi.</p>
      </div>
    </section>
  );
}
