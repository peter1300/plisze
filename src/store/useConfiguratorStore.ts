import { create } from "zustand";
import { pricing } from "../config/pricing";
import { clampDimension, maxWidthFor } from "../lib/calculatePrice";
import type {
  CartItem,
  ColorId,
  ConfiguratorStep,
  OpeningMode,
  Placement,
  ProductConfig,
  ProductType,
} from "../types";

interface ConfiguratorState extends ProductConfig {
  step: ConfiguratorStep;
  coverage: number;
  editingId: string | null;
  setStep: (step: ConfiguratorStep) => void;
  setProductType: (productType: ProductType) => void;
  setPlacement: (placement: Placement) => void;
  setOpening: (opening: OpeningMode) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setColor: (colorId: ColorId) => void;
  setCoverage: (coverage: number) => void;
  startFresh: (productType?: ProductType) => void;
  loadItem: (item: CartItem) => void;
  asConfig: () => ProductConfig;
}

const defaults: ProductConfig = {
  productType: "single",
  placement: "terrace",
  opening: "ltr",
  width: pricing.defaultWidth,
  height: pricing.defaultHeight,
  colorId: "anthracite",
};

function applyType(productType: ProductType, current: ProductConfig): ProductConfig {
  const next: ProductConfig = { ...current, productType };

  if (productType === "double") {
    next.opening = "center";
    next.placement = current.placement === "window" ? "terrace" : current.placement;
    next.width = clampDimension(Math.max(current.width, 1800), pricing.minimumWidth, maxWidthFor("double"));
  } else if (productType === "window") {
    next.placement = "window";
    next.opening = current.opening === "center" ? "ltr" : current.opening;
    next.width = pricing.defaultWindowWidth;
    next.height = pricing.defaultWindowHeight;
  } else {
    next.opening = current.opening === "center" ? "ltr" : current.opening;
    next.width = clampDimension(current.width, pricing.minimumWidth, maxWidthFor("single"));
  }

  return next;
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  ...defaults,
  step: 1,
  coverage: 0.72,
  editingId: null,
  setStep: (step) => set({ step }),
  setProductType: (productType) => set(applyType(productType, get())),
  setPlacement: (placement) => {
    const current = get();
    if (placement === "window") {
      set({
        placement,
        productType: "window",
        opening: current.opening === "center" ? "ltr" : current.opening,
        width: pricing.defaultWindowWidth,
        height: pricing.defaultWindowHeight,
      });
      return;
    }
    if (current.productType === "window") {
      set({
        placement,
        productType: "single",
        width: pricing.defaultWidth,
        height: pricing.defaultHeight,
      });
      return;
    }
    set({ placement });
  },
  setOpening: (opening) => {
    if (opening === "center") {
      set({ opening, productType: "double" });
      return;
    }
    const current = get();
    set({
      opening,
      productType: current.productType === "double" ? "single" : current.productType,
    });
  },
  setWidth: (width) =>
    set({
      width: clampDimension(width, pricing.minimumWidth, maxWidthFor(get().productType)),
    }),
  setHeight: (height) =>
    set({
      height: clampDimension(height, pricing.minimumHeight, pricing.maximumHeight),
    }),
  setColor: (colorId) => set({ colorId }),
  setCoverage: (coverage) =>
    set({ coverage: Math.min(1, Math.max(0.08, coverage)) }),
  startFresh: (productType) => {
    const base = { ...defaults };
    const next = productType ? applyType(productType, base) : base;
    set({ ...next, step: 1, coverage: 0.72, editingId: null });
  },
  loadItem: (item) => {
    set({
      productType: item.productType,
      placement: item.placement,
      opening: item.opening,
      width: item.width,
      height: item.height,
      colorId: item.colorId,
      step: 3,
      coverage: 0.72,
      editingId: item.id,
    });
  },
  asConfig: () => {
    const s = get();
    return {
      productType: s.productType,
      placement: s.placement,
      opening: s.opening,
      width: s.width,
      height: s.height,
      colorId: s.colorId,
    };
  },
}));
