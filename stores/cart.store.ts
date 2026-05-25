import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/cart";

interface AddItemInput {
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  size: string;
  price: number;
  comparePrice?: number | null;
  image: string;
  maxStock: number;
  quantity?: number;
}

interface CartState {
  items: CartItem[];
  addItem: (input: AddItemInput) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clear: () => void;
}

const keyFor = (productId: string, variantId: string) => `${productId}:${variantId}`;

/**
 * Cart store — persisted to localStorage so the bag survives reloads.
 * Items are keyed per variant (size), so the same product in two sizes
 * are tracked as distinct lines.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (input) =>
        set((state) => {
          const key = keyFor(input.productId, input.variantId);
          const qty = input.quantity ?? 1;
          const existing = state.items.find((i) => i.key === key);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key
                  ? { ...i, quantity: Math.min(i.quantity + qty, i.maxStock) }
                  : i
              ),
            };
          }

          const item: CartItem = {
            key,
            productId: input.productId,
            variantId: input.variantId,
            slug: input.slug,
            name: input.name,
            size: input.size,
            price: input.price,
            comparePrice: input.comparePrice ?? null,
            image: input.image,
            quantity: Math.min(qty, input.maxStock),
            maxStock: input.maxStock,
          };
          return { items: [...state.items, item] };
        }),

      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),

      updateQuantity: (key, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.key === key
                ? { ...i, quantity: Math.max(0, Math.min(quantity, i.maxStock)) }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),

      clear: () => set({ items: [] }),
    }),
    { name: "luxafoir:cart" }
  )
);
