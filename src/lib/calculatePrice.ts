import { pricing } from "../config/pricing";
import type { ColorId, PriceBreakdown, ProductConfig, ProductType } from "../types";

export function maxWidthFor(type: ProductType): number {
  return pricing.maximumWidth[type];
}

export function clampDimension(
  value: number,
  min: number,
  max: number,
): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, Math.round(value)));
}

export function calculatePrice(config: ProductConfig): PriceBreakdown {
  const widthM = config.width / 1000;
  const heightM = config.height / 1000;
  const area = widthM * heightM;

  const areaPrice = area * pricing.pricePerSquareMeter;
  const typeSurcharge =
    config.productType === "double" ? pricing.doubleDoorSurcharge : 0;
  const colorSurcharge = pricing.colorSurcharge[config.colorId as ColorId] ?? 0;
  const multiplier =
    config.productType === "window" ? pricing.windowMultiplier : 1;

  const subtotal =
    (pricing.basePrice + areaPrice) * multiplier +
    typeSurcharge +
    colorSurcharge;
  const total = Math.max(pricing.minimumPrice, Math.round(subtotal / 100) * 100);

  return {
    area,
    basePrice: pricing.basePrice,
    areaPrice,
    typeSurcharge,
    colorSurcharge,
    subtotal,
    total,
  };
}

export function formatHuf(value: number): string {
  return `${new Intl.NumberFormat("hu-HU").format(Math.round(value))} Ft`;
}

export function formatSize(width: number, height: number): string {
  return `${width} × ${height} mm`;
}

export function formatArea(area: number): string {
  return `${area.toFixed(2).replace(".", ",")} m²`;
}
