import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

function SocialIcon({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} aria-label={label} className="text-white hover:text-gold">
      {children}
    </a>
  );
}

const linkCls = "text-white/75 hover:text-gold";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-14 md:grid-cols-4 md:px-8 md:py-16">
        <div>
          <Logo light />
          <p className="mt-4 max-w-[240px] text-[13px] font-light leading-relaxed text-white/60">
            Kizárólag pliszé szúnyoghálók. Egyedi méretre, ajtóra és ablakra.
          </p>
          <div className="mt-5 flex gap-4">
            <SocialIcon label="Facebook" href="https://facebook.com">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1Z" />
              </svg>
            </SocialIcon>
            <SocialIcon label="Instagram" href="https://instagram.com">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
              </svg>
            </SocialIcon>
            <SocialIcon label="YouTube" href="https://youtube.com">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M23 12.2s0-3.2-.4-4.6c-.2-.8-.9-1.5-1.7-1.7C19.3 5.5 12 5.5 12 5.5s-7.3 0-8.9.4c-.8.2-1.5.9-1.7 1.7C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.8.9 1.5 1.7 1.7 1.6.4 8.9.4 8.9.4s7.3 0 8.9-.4c.8-.2 1.5-.9 1.7-1.7.4-1.4.4-4.6.4-4.6ZM9.8 15.5V8.9l6.2 3.3-6.2 3.3Z" />
              </svg>
            </SocialIcon>
          </div>
        </div>
        <div>
          <p className="text-[12px] font-semibold tracking-[0.14em] text-gold uppercase">Navigáció</p>
          <ul className="mt-4 space-y-2.5 text-[14px] font-light">
            <li>
              <a href={`${import.meta.env.BASE_URL}#termekek`} className={linkCls}>
                Pliszé szúnyoghálók
              </a>
            </li>
            <li>
              <a href={`${import.meta.env.BASE_URL}#hogyan-merjek`} className={linkCls}>
                Hogyan mérjek?
              </a>
            </li>
            <li>
              <a href={`${import.meta.env.BASE_URL}#szinek`} className={linkCls}>
                Színek
              </a>
            </li>
            <li>
              <a href={`${import.meta.env.BASE_URL}#gyik`} className={linkCls}>
                GYIK
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[12px] font-semibold tracking-[0.14em] text-gold uppercase">Vásárlás</p>
          <ul className="mt-4 space-y-2.5 text-[14px] font-light">
            <li>
              <Link to="/konfigurator" className={linkCls}>
                Árkalkulátor
              </Link>
            </li>
            <li>
              <Link to="/kosar" className={linkCls}>
                Kosár
              </Link>
            </li>
            <li>
              <Link to="/aszf" className={linkCls}>
                ÁSZF
              </Link>
            </li>
            <li>
              <Link to="/szallitas" className={linkCls}>
                Szállítás és fizetés
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[12px] font-semibold tracking-[0.14em] text-gold uppercase">Kapcsolat</p>
          <ul className="mt-4 space-y-2.5 text-[14px] font-light">
            <li>
              <a href="mailto:hello@plisze.hu" className={linkCls}>
                hello@plisze.hu
              </a>
            </li>
            <li>
              <a href="tel:+36305551200" className={linkCls}>
                +36 30 555 1200
              </a>
            </li>
            <li className="text-white/50">Budapest</li>
            <li>
              <Link to="/adatkezeles" className={linkCls}>
                Adatkezelés
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-[1280px] px-5 py-5 text-[12px] font-light text-white/45 md:px-8">
          © {new Date().getFullYear()} Pliszé. Minden jog fenntartva.
        </p>
      </div>
    </footer>
  );
}
