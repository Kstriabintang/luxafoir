"use client";

import dynamic from "next/dynamic";

/**
 * Heavy, interaction-only overlays are code-split and client-only — they never
 * need SSR and shouldn't weigh down the initial document. Loaded on demand.
 */
const CartDrawer = dynamic(
  () => import("@/components/cart/CartDrawer").then((m) => m.CartDrawer),
  { ssr: false }
);
const SearchOverlay = dynamic(
  () => import("@/components/shared/SearchOverlay").then((m) => m.SearchOverlay),
  { ssr: false }
);
const QuickView = dynamic(
  () => import("@/components/product/QuickView").then((m) => m.QuickView),
  { ssr: false }
);
const NewsletterPopup = dynamic(
  () => import("@/components/shared/NewsletterPopup").then((m) => m.NewsletterPopup),
  { ssr: false }
);

export function Overlays() {
  return (
    <>
      <CartDrawer />
      <SearchOverlay />
      <QuickView />
      <NewsletterPopup />
    </>
  );
}
