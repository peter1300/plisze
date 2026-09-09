import type { OpeningMode, Placement, ProductType } from "../types";

export const productTypes: {
  id: ProductType;
  name: string;
  short: string;
  description: string;
}[] = [
  {
    id: "single",
    name: "Egyszárnyú pliszé szúnyogháló",
    short: "Egyszárnyú",
    description: "Egy irányba nyílik. Ajtókra és keskenyebb teraszajtókra.",
  },
  {
    id: "double",
    name: "Kétszárnyú pliszé szúnyogháló",
    short: "Kétszárnyú",
    description: "Középre záródik. Széles terasz- és emelő-tolóajtókra.",
  },
  {
    id: "window",
    name: "Ablak pliszé szúnyogháló",
    short: "Ablak",
    description: "Ablaknyílásra, egyedi méretre. Finomabb keretszelvény.",
  },
];

export const placements: {
  id: Placement;
  name: string;
  description: string;
}[] = [
  { id: "door", name: "Ajtó", description: "Bejárati vagy erkélyajtó." },
  { id: "terrace", name: "Teraszajtó", description: "Nagy üvegfelület, tágas nyílás." },
  { id: "window", name: "Ablak", description: "Bukó-nyíló vagy fix ablak." },
];

export const openingModes: {
  id: OpeningMode;
  name: string;
  description: string;
  for: ProductType[];
}[] = [
  {
    id: "ltr",
    name: "Balról jobbra",
    description: "A háló a bal oldalon tárolódik, jobbra záródik.",
    for: ["single", "window"],
  },
  {
    id: "rtl",
    name: "Jobbról balra",
    description: "A háló a jobb oldalon tárolódik, balra záródik.",
    for: ["single", "window"],
  },
  {
    id: "center",
    name: "Középre záródó",
    description: "Két szárny a középvonalban találkozik.",
    for: ["double"],
  },
];

export function productLabel(type: ProductType): string {
  return productTypes.find((p) => p.id === type)?.short ?? type;
}

export function openingLabel(mode: OpeningMode): string {
  return openingModes.find((o) => o.id === mode)?.name ?? mode;
}

export function placementLabel(placement: Placement): string {
  return placements.find((p) => p.id === placement)?.name ?? placement;
}
