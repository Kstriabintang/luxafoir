"use client";

import { useEffect } from "react";
import { RelatedProducts } from "./RelatedProducts";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { getProductById } from "@/lib/mock-data";

/**
 * Records the current product into the recently-viewed list and renders the
 * persisted history (excluding the current product).
 */
export function RecentlyViewed({ currentId }: { currentId: string }) {
  const { ids, record } = useRecentlyViewed();

  useEffect(() => {
    record(currentId);
  }, [currentId, record]);

  const products = ids
    .filter((id) => id !== currentId)
    .map(getProductById)
    .filter((p): p is NonNullable<typeof p> => p !== null);

  if (products.length === 0) return null;

  return <RelatedProducts products={products} title="Recently Viewed" />;
}
