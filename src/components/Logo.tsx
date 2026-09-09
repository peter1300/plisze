import { Link } from "react-router-dom";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="inline-flex items-center" aria-label="Pliszé főoldal">
      <span
        className={`text-[19px] font-semibold tracking-[-0.03em] ${light ? "text-white" : "text-ink"}`}
      >
        Pliszé
      </span>
    </Link>
  );
}
