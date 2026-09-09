import { ArrowRight } from "lucide-react";
import { photos } from "../data/content";
import { useConfiguratorStore } from "../store/useConfiguratorStore";
import { Reveal } from "./Reveal";
import { ButtonLink } from "./ui/Button";

export function MadeToMeasure() {
  const startFresh = useConfiguratorStore((s) => s.startFresh);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1120px] px-5 pb-20 md:px-8 md:pb-28">
        <Reveal>
          <div className="grid overflow-hidden rounded-[16px] bg-surface lg:grid-cols-2">
            <img
              src={photos.interior}
              alt="Nappali teraszajtóval és pliszé szúnyoghálóval"
              className="aspect-[16/10] h-full w-full object-cover lg:aspect-auto lg:min-h-[420px]"
            />
            <div className="flex flex-col justify-center px-8 py-10 md:px-12 md:py-16">
              <h2 className="text-[32px] leading-[1.08] font-semibold tracking-[-0.035em] md:text-[40px]">
                Nem raktárról. Pont a te ajtódra.
              </h2>
              <p className="mt-4 max-w-[380px] text-[16px] leading-relaxed text-mute">
                Minden pliszé szúnyoghálót a megadott milliméterek alapján készítünk el. Nincs standard méret, nincs vágás a helyszínen.
              </p>
              <ButtonLink
                to="/konfigurator"
                onClick={() => startFresh()}
                className="mt-8 w-fit"
              >
                Tervezd meg most
                <ArrowRight size={16} strokeWidth={1.8} />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
