"use client";

import { useMemo } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cart.store";
import { useUIStore } from "@/stores/ui.store";
import { useHydrated } from "./useHydrated";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import type { CartItem, CartSummary } from "@/types/cart";

/**
 * Cart facade: items, derived summary, and high-level actions.
 * `addToCart` adds the line, opens the drawer, and fires a toast —
 * the conversion-optimised "add → drawer opens" flow.
 */
export function useCart() {
  const hydrated = useHydrated();
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clear = useCartStore((s) => s.clear);
  const openCart = useUIStore((s) => s.openCart);

  const summary: CartSummary = useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const qualifies = subtotal >= FREE_SHIPPING_THRESHOLD;
    return {
      subtotal,
      itemCount,
      freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      qualifiesForFreeShipping: qualifies,
      remainingForFreeShipping: qualifies ? 0 : FREE_SHIPPING_THRESHOLD - subtotal,
    };
  }, [items]);

  const addToCart = (input: Parameters<typeof addItem>[0]) => {
    addItem(input);
    openCart();
    toast.success("Added to bag", {
      description: `${input.name} · ${input.size}`,
    });
  };

  return {
    // Avoid hydration mismatch: report empty until mounted.
    items: hydrated ? items : ([] as CartItem[]),
    summary: hydrated
      ? summary
      : {
          subtotal: 0,
          itemCount: 0,
          freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
          qualifiesForFreeShipping: false,
          remainingForFreeShipping: FREE_SHIPPING_THRESHOLD,
        },
    hydrated,
    addToCart,
    addItem,
    removeItem,
    updateQuantity,
    clear,
  };
}
