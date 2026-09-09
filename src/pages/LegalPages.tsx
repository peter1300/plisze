import { Link } from "react-router-dom";
import type { ReactNode } from "react";

function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-[720px] px-5 py-16 md:py-24">
      <h1 className="text-[36px] font-semibold tracking-[-0.03em] md:text-[44px]">{title}</h1>
      <div className="mt-8 space-y-4 text-[16px] leading-relaxed text-mute">{children}</div>
    </article>
  );
}

export function AszfPage() {
  return (
    <LegalShell title="Általános szerződési feltételek">
      <p>Ezek a feltételek a Plisze demó webáruházra vonatkoznak. Az oldal jelenleg bemutató célú frontend, valós szerződéskötés és fizetés nem történik.</p>
      <p>A pliszé szúnyoghálók egyedi méretre készülnek a vásárló által megadott milliméterek alapján. A gyártás a megrendelés visszaigazolása után indul.</p>
      <p>Az árak forintban, ÁFÁ-val értendők. A szállítási díj a rendelés során kerül feltüntetésre.</p>
      <p>
        <Link to="/" className="text-ink underline underline-offset-4">
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
      <p>Valós üzemeltetés esetén az adatkezelési tájékoztató tartalmazná a kezelő szervet, a jogalapot, a megőrzési időt és az érintetti jogokat a GDPR szerint.</p>
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
    <LegalShell title="Kapcsolat">
      <p>Plisze — pliszé szúnyoghálók.</p>
      <p>
        E-mail: <a href="mailto:hello@plisze.hu" className="text-ink">hello@plisze.hu</a>
        <br />
        Telefon: <a href="tel:+36305551200" className="text-ink">+36 30 555 1200</a>
        <br />
        Budapest
      </p>
      <p>Kérdésed van a méréssel vagy a típussal kapcsolatban? Írj, mielőtt rendelsz.</p>
    </LegalShell>
  );
}
