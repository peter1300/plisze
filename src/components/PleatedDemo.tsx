import { useState } from "react";
import { photos } from "../data/content";
import { PleatedPreview } from "./PleatedPreview";

export function PleatedDemo() {
  const [coverage, setCoverage] = useState(0.42);

  return (
    <section id="hogyan-mukodik" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-8 md:py-24">
        <p className="text-center text-[12px] font-semibold tracking-[0.18em] text-mute uppercase">Működés</p>
        <h2 className="display mx-auto mt-3 max-w-[640px] text-center text-[36px] md:text-[52px]">
          Húzd el. <strong>Nyisd ki. Zárd be.</strong>
        </h2>
        <div className="mt-10 overflow-hidden rounded-[28px]">
          <PleatedPreview
            photo={photos.heroEmpty}
            netPhoto={photos.heroNetted}
            coverage={coverage}
            onCoverageChange={setCoverage}
            interactive
            showFrame={false}
            inset={{ top: 14.5, right: 35.5, bottom: 16.5, left: 40.5 }}
            className="aspect-[16/9] min-h-[280px] w-full md:min-h-[480px]"
          />
        </div>
        <p className="mt-4 text-center text-[14px] font-light text-mute">Húzd a középső kört — a háló követi.</p>
      </div>
    </section>
  );
}
