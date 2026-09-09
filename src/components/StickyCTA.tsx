import { Phone } from "lucide-react";
import { useConfiguratorStore } from "../store/useConfiguratorStore";
import { ButtonLink } from "./ui/Button";

export function StickyCTA() {
  const startFresh = useConfiguratorStore((s) => s.startFresh);

  return (
    <>
      <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-line bg-white/95 px-4 py-3 backdrop-blur-xl md:hidden">
        <ButtonLink to="/konfigurator" onClick={() => startFresh()} className="w-full">
          Árkalkuláció
        </ButtonLink>
      </div>
      <ButtonLink
        to="/konfigurator"
        onClick={() => startFresh()}
        className="fixed right-5 bottom-6 z-40 hidden shadow-[0_12px_40px_rgba(0,0,0,0.18)] md:inline-flex"
      >
        <Phone size={15} strokeWidth={2.4} />
        Árkalkuláció
      </ButtonLink>
    </>
  );
}
