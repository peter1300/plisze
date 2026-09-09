import type { JSX } from "react";
import type { Placement } from "../types";

function DoorIcon() {
  return (
    <svg viewBox="0 0 72 88" className="mx-auto h-[72px] w-auto text-ink" fill="none" aria-hidden>
      <rect x="16" y="8" width="40" height="72" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="22" y="14" width="28" height="60" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="46" cy="46" r="1.6" fill="currentColor" />
    </svg>
  );
}

function TerraceIcon() {
  return (
    <svg viewBox="0 0 96 72" className="mx-auto h-[56px] w-auto text-ink" fill="none" aria-hidden>
      <rect x="6" y="8" width="84" height="56" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <line x1="48" y1="8" x2="48" y2="64" stroke="currentColor" strokeWidth="1.2" />
      <rect x="12" y="14" width="30" height="44" stroke="currentColor" strokeWidth="1.1" />
      <rect x="54" y="14" width="30" height="44" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

function WindowIcon() {
  return (
    <svg viewBox="0 0 72 72" className="mx-auto h-[64px] w-auto text-ink" fill="none" aria-hidden>
      <rect x="12" y="10" width="48" height="52" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <line x1="36" y1="10" x2="36" y2="62" stroke="currentColor" strokeWidth="1.2" />
      <line x1="12" y1="36" x2="60" y2="36" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

const cards: { id: Placement; name: string; hint: string; Icon: () => JSX.Element }[] = [
  { id: "door", name: "Ajtó", hint: "Bejárati vagy erkélyajtó", Icon: DoorIcon },
  { id: "terrace", name: "Teraszajtó", hint: "Széles üvegfelület", Icon: TerraceIcon },
  { id: "window", name: "Ablak", hint: "Bukó-nyíló vagy fix", Icon: WindowIcon },
];

export function ProductTypeSelector({
  value,
  onChange,
}: {
  value: Placement;
  onChange: (id: Placement) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {cards.map((card) => {
        const selected = value === card.id;
        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onChange(card.id)}
            className={`rounded-[20px] border bg-white px-3 py-5 text-center transition ${
              selected ? "border-gold shadow-[0_0_0_1px_#ffb00b]" : "border-line hover:border-[#d2d2d7]"
            }`}
          >
            <card.Icon />
            <span className="mt-3 block text-[15px] font-medium">{card.name}</span>
            <span className="mt-1 block text-[12px] text-mute">{card.hint}</span>
          </button>
        );
      })}
    </div>
  );
}
