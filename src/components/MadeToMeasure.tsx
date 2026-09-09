import { ArrowRight } from "lucide-react";
import { photos } from "../data/content";
import { useConfiguratorStore } from "../store/useConfiguratorStore";
import { Reveal } from "./Reveal";
import { ButtonLink } from "./ui/Button";

export function MadeToMeasure() {
  const startFresh = useConfiguratorStore((s) => s.startFresh);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-5 pb-20 md:px-8 md:pb-28">
        <Reveal>
          <div className="grid overflow-hidden rounded-[28px] bg-ink text-white lg:grid-cols-2">
            <img
              src={photos.interior}
              alt="Nappali teraszajtóval és pliszé szúnyoghálóval"
              className="aspect-[16/10] h-full w-full object-cover lg:aspect-auto lg:min-h-[460px]"
            />
            <div className="flex flex-col justify-center px-8 py-12 md:px-14 md:py-16">
              <p className="text-[12px] font-semibold tracking-[0.18em] text-gold uppercase">Egyedi méret</p>
              <h2 className="display mt-3 text-[34px] md:text-[48px]">
                Nem raktárról. <strong>Pont a te ajtódra.</strong>
              </h2>
              <p className="mt-4 max-w-[400px] text-[16px] font-light leading-relaxed text-white/70">
                Minden pliszé szúnyoghálót a megadott milliméterek alapján készítünk el. Nincs standard méret, nincs vágás a helyszínen.
              </p>
              <ButtonLink to="/konfigurator" onClick={() => startFresh()} className="mt-8 w-fit">
                Tervezd meg most
                <ArrowRight size={16} strokeWidth={2.2} />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
