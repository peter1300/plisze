import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { ButtonLink } from "../components/ui/Button";

function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-[720px] px-5 py-16 md:py-24">
      <h1 className="display text-[36px] md:text-[48px]">{title}</h1>
      <div className="mt-8 space-y-4 text-[16px] font-light leading-relaxed text-mute">{children}</div>
    </article>
  );
}

export function AszfPage() {
  return (
    <LegalShell title="Általános szerződési feltételek">
      <p>
        Ezek a feltételek a Plisze demó webáruházra vonatkoznak. Az oldal jelenleg bemutató célú frontend, valós
        szerződéskötés és fizetés nem történik.
      </p>
      <p>
        A pliszé szúnyoghálók egyedi méretre készülnek a vásárló által megadott milliméterek alapján. A gyártás a
        megrendelés visszaigazolása után indul.
      </p>
      <p>Az árak forintban, ÁFÁ-val értendők. A szállítási díj a rendelés során kerül feltüntetésre.</p>
      <p>
        <Link to="/" className="font-medium text-ink underline underline-offset-4">
          Vissza a főoldalra
        </Link>
      </p>
    </LegalShell>
  );
}

export function PrivacyPage() {
  return (
    <LegalShell title="Adatkezelés">
      <p>A demó checkoutban megadott adatokat a böngésző nem küldi el külső szerverre. Nincs analitikai követés beépítve.</p>
      <p>
        Valós üzemeltetés esetén az adatkezelési tájékoztató tartalmazná a kezelő szervet, a jogalapot, a megőrzési időt
        és az érintetti jogokat a GDPR szerint.
      </p>
    </LegalShell>
  );
}

export function ShippingPage() {
  return (
    <LegalShell title="Szállítás és fizetés">
      <p>A kész pliszé szúnyoghálót futárral vagy személyes átvétellel juttatjuk el. A gyártási idő jellemzően 10–14 munkanap.</p>
      <p>Előkészített fizetési módok: bankkártya és átutalás. A kártyás fizetés a demóban nem terhel.</p>
      <p>Az egyedi méretre gyártott termék a Ptk. szerinti egyedi megrendelésnek minősül.</p>
    </LegalShell>
  );
}

export function ContactPage() {
  return (
    <article className="mx-auto max-w-[1280px] px-5 py-16 md:px-8 md:py-24">
      <p className="text-[12px] font-semibold tracking-[0.18em] text-mute uppercase">Kapcsolat</p>
      <h1 className="display mt-3 max-w-[640px] text-[36px] md:text-[56px]">
        Írj, mielőtt <strong>rendelsz.</strong>
      </h1>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] bg-surface p-8 md:p-10">
          <p className="text-[16px] font-light leading-relaxed text-mute">
            Mérés, típus, szállítási idő — a pliszé szúnyoghálóról szívesen beszélünk.
          </p>
          <p className="mt-8 text-[18px] font-bold tracking-tight">
            <a href="mailto:hello@plisze.hu" className="hover:text-gold">
              hello@plisze.hu
            </a>
          </p>
          <p className="mt-2 text-[18px] font-bold tracking-tight">
            <a href="tel:+36305551200" className="hover:text-gold">
              +36 30 555 1200
            </a>
          </p>
          <p className="mt-4 text-[14px] font-light text-mute">Budapest</p>
        </div>
        <div className="flex flex-col justify-between rounded-[28px] bg-ink p-8 text-white md:p-10">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.18em] text-gold uppercase">Árkalkuláció</p>
            <h2 className="display mt-3 text-[28px] md:text-[36px]">
              Azonnali ár. <strong>Öt lépés.</strong>
            </h2>
            <p className="mt-3 text-[15px] font-light text-white/70">
              Méret, szín, nyitás — a konfigurátorban azonnal látod a pliszé árát.
            </p>
          </div>
          <ButtonLink to="/konfigurator" className="mt-8 w-fit">
            Konfigurátor
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
