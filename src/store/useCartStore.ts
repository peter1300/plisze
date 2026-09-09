import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculatePrice } from "../lib/calculatePrice";
import type { CartItem, ProductConfig } from "../types";

interface CartState {
  items: CartItem[];
  addItem: (config: ProductConfig, quantity?: number) => string;
  updateItem: (id: string, config: ProductConfig) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (config, quantity = 1) => {
        const id = crypto.randomUUID();
        const unitPrice = calculatePrice(config).total;
        set({
          items: [...get().items, { ...config, id, quantity, unitPrice }],
        });
        return id;
      },
      updateItem: (id, config) => {
        const unitPrice = calculatePrice(config).total;
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, ...config, unitPrice } : item,
          ),
        });
      },
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },
      setQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        });
      },
      clear: () => set({ items: [] }),
    }),
    { name: "plisze-cart" },
  ),
);

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}
