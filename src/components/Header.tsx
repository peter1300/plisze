import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cartCount, useCartStore } from "../store/useCartStore";
import { useConfiguratorStore } from "../store/useConfiguratorStore";
import { Logo } from "./Logo";
import { ButtonLink } from "./ui/Button";

const links = [
  { to: `${import.meta.env.BASE_URL}#termekek`, label: "Termékeink" },
  { to: `${import.meta.env.BASE_URL}#referenciak`, label: "Referenciák" },
  { to: `${import.meta.env.BASE_URL}#hogyan-merjek`, label: "Hogyan mérjek?" },
  { to: `${import.meta.env.BASE_URL}#gyik`, label: "Info" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const count = cartCount(items);
  const startFresh = useConfiguratorStore((s) => s.startFresh);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 md:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.to}
              href={link.to}
              className="text-[12px] font-semibold tracking-[0.14em] text-ink uppercase transition-colors hover:text-mute"
            >
              {link.label}
            </a>
          ))}
          <NavLink
            to="/kapcsolat"
            className="text-[12px] font-semibold tracking-[0.14em] text-ink uppercase transition-colors hover:text-mute"
          >
            Kapcsolat
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink to="/konfigurator" variant="secondary" className="hidden lg:inline-flex">
            Konfigurátor
          </ButtonLink>
          <ButtonLink to="/konfigurator" onClick={() => startFresh()} className="hidden md:inline-flex">
            Árkalkuláció
          </ButtonLink>
          <NavLink
            to="/kosar"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-ink"
            aria-label="Kosár"
          >
            <ShoppingBag size={18} strokeWidth={1.7} />
            {count > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-black text-ink">
                {count}
              </span>
            )}
          </NavLink>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X size={20} strokeWidth={1.5} />
            ) : (
              <span className="flex flex-col gap-1.5">
                <span className="block h-px w-5 bg-ink" />
                <span className="block h-px w-5 bg-ink" />
              </span>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[72px] z-40 bg-white lg:hidden"
          >
            <nav className="flex flex-col px-6 pt-6">
              {links.map((link) => (
                <a
                  key={link.to}
                  href={link.to}
                  className="border-b border-line py-4 text-[18px] font-semibold tracking-tight uppercase"
                >
                  {link.label}
                </a>
              ))}
              <NavLink
                to="/kapcsolat"
                className="border-b border-line py-4 text-[18px] font-semibold tracking-tight uppercase"
              >
                Kapcsolat
              </NavLink>
              <ButtonLink
                to="/konfigurator"
                onClick={() => startFresh()}
                className="mt-8 w-full"
              >
                Árkalkuláció
              </ButtonLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
