import type { ColorId, ProductType } from "../types";

/**
 * Árképzés — egyetlen forrás. Minden kalkuláció ebből a fájlból olvas.
 * Az összegek forintban értendők.
 */
export const pricing = {
  basePrice: 56000,
  pricePerSquareMeter: 51900,
  minimumPrice: 89000,
  minimumWidth: 500,
  minimumHeight: 700,
  maximumHeight: 2600,
  maximumWidth: {
    single: 1800,
    double: 4000,
    window: 2000,
  } satisfies Record<ProductType, number>,
  doubleDoorSurcharge: 32000,
  windowMultiplier: 0.92,
  colorSurcharge: {
    white: 0,
    anthracite: 0,
    brown: 6000,
    black: 8000,
    goldenOak: 12000,
    walnut: 12000,
  } satisfies Record<ColorId, number>,
  defaultWidth: 1200,
  defaultHeight: 2150,
  defaultWindowWidth: 1200,
  defaultWindowHeight: 1400,
} as const;

export const brand = {
  name: "Plisze",
  phone: "+36 30 555 1200",
  email: "hello@plisze.hu",
  leadTime: "10–14 munkanap",
} as const;
