import { Link } from "react-router-dom";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="inline-flex items-baseline gap-0.5" aria-label="Pliszé főoldal">
      <span
        className={`text-[22px] font-black tracking-[-0.04em] uppercase ${light ? "text-white" : "text-ink"}`}
      >
        Pliszé
      </span>
      <span className="text-gold text-[22px] font-black">.</span>
    </Link>
  );
}
