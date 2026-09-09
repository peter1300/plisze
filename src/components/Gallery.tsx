import { photos } from "../data/content";
import { Reveal } from "./Reveal";

export function Gallery() {
  return (
    <section id="referenciak" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-[1280px] px-5 pb-20 md:px-8 md:pb-28">
        <Reveal>
          <p className="text-[12px] font-semibold tracking-[0.18em] text-mute uppercase">Referenciák</p>
          <h2 className="display mt-3 max-w-[640px] text-[36px] md:text-[52px]">
            Luxus otthonok. <strong>Valódi pliszé.</strong>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 md:grid-rows-2">
          <Reveal className="md:row-span-2">
            <img
              src={photos.galleryDusk}
              alt="Teraszajtó alkonyatkor pliszé szúnyoghálóval"
              className="h-full min-h-[280px] w-full rounded-[28px] object-cover md:min-h-[560px]"
            />
          </Reveal>
          <Reveal>
            <img
              src={photos.galleryWhite}
              alt="Fehér pliszé szúnyogháló beltérben"
              className="aspect-[16/9] w-full rounded-[28px] object-cover md:aspect-auto md:h-full"
            />
          </Reveal>
          <Reveal delay={0.06}>
            <img
              src={photos.galleryWindow}
              alt="Széles teraszajtó pliszé szúnyoghálóval"
              className="aspect-[16/9] w-full rounded-[28px] object-cover md:aspect-auto md:h-full"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
