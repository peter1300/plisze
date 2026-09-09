import type { ColorId } from "../types";

export interface FrameColor {
  id: ColorId;
  name: string;
  hex: string;
  metal: string;
  description: string;
}

export const frameColors: FrameColor[] = [
  {
    id: "white",
    name: "Fehér",
    hex: "#F2F2F4",
    metal: "#D8D8DE",
    description: "Klasszikus, fényes alumínium.",
  },
  {
    id: "anthracite",
    name: "Antracit",
    hex: "#3A3A3C",
    metal: "#2C2C2E",
    description: "Modern, semleges szürke.",
  },
  {
    id: "brown",
    name: "Barna",
    hex: "#5C4033",
    metal: "#4A342A",
    description: "Meleg, fa nyílászárókhoz.",
  },
  {
    id: "black",
    name: "Fekete",
    hex: "#1D1D1F",
    metal: "#111113",
    description: "Grafit, kortárs homlokzatokra.",
  },
  {
    id: "goldenOak",
    name: "Aranytölgy",
    hex: "#C4A574",
    metal: "#A48454",
    description: "Dekorfa, tölgy nyílászárókhoz.",
  },
  {
    id: "walnut",
    name: "Dió",
    hex: "#6B4423",
    metal: "#56361C",
    description: "Mélyebb faerezetű dekor.",
  },
];

export function getColor(id: ColorId): FrameColor {
  return frameColors.find((c) => c.id === id) ?? frameColors[1];
}
