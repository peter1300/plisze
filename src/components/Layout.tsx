import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { StickyCTA } from "./StickyCTA";

export function Layout() {
  const location = useLocation();
  const hideChrome = ["/kosar", "/rendeles"].some((p) => location.pathname.startsWith(p));
  const hideSticky = hideChrome || location.pathname.startsWith("/konfigurator");

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = location.hash;
    const tryScroll = () => {
      const el = document.querySelector(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };

    if (tryScroll()) return;

    const t = window.setTimeout(() => {
      if (!tryScroll()) window.scrollTo(0, 0);
    }, 50);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);

  return (
    <div className={`flex min-h-dvh flex-col ${hideSticky ? "" : "pb-16 md:pb-0"}`}>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {!hideSticky && <StickyCTA />}
    </div>
  );
}
