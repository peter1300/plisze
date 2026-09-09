import { photos } from "../data/content";
import { Reveal } from "./Reveal";

export function Gallery() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1120px] px-5 pb-20 md:px-8 md:pb-28">
        <Reveal>
          <p className="text-[12px] font-medium tracking-[0.16em] text-mute uppercase">Referenciák</p>
          <h2 className="mt-3 max-w-[560px] text-[32px] leading-[1.08] font-semibold tracking-[-0.035em] md:text-[40px]">
            Valódi otthonok.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-3 md:grid-cols-2 md:grid-rows-2 md:gap-4">
          <Reveal className="md:row-span-2">
            <img
              src={photos.galleryDusk}
              alt="Teraszajtó alkonyatkor pliszé szúnyoghálóval"
              className="h-full min-h-[280px] w-full rounded-[16px] object-cover md:min-h-[520px]"
            />
          </Reveal>
          <Reveal>
            <img
              src={photos.galleryWhite}
              alt="Fehér pliszé szúnyogháló beltérben"
              className="aspect-[16/9] w-full rounded-[16px] object-cover md:aspect-auto md:h-full"
            />
          </Reveal>
          <Reveal delay={0.06}>
            <img
              src={photos.galleryWindow}
              alt="Ablak pliszé szúnyogháló"
              className="aspect-[16/9] w-full rounded-[16px] object-cover md:aspect-auto md:h-full"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
