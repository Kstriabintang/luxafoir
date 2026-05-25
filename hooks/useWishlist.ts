"use client";

import { toast } from "sonner";
import { useWishlistStore } from "@/stores/wishlist.store";
import { useHydrated } from "./useHydrated";

/** Wishlist facade with hydration-safe reads and toast feedback. */
export function useWishlist() {
  const hydrated = useHydrated();
  const ids = useWishlistStore((s) => s.ids);
  const toggleStore = useWishlistStore((s) => s.toggle);

  const has = (productId: string) => hydrated && ids.includes(productId);

  const toggle = (productId: string, name?: string) => {
    const wasSaved = ids.includes(productId);
    toggleStore(productId);
    toast.success(wasSaved ? "Removed from wishlist" : "Saved to wishlist", {
      description: name,
    });
  };

  return { ids: hydrated ? ids : [], count: hydrated ? ids.length : 0, has, toggle };
}
