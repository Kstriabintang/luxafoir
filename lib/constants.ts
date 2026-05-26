/** Free shipping kicks in above this subtotal (IDR). */
export const FREE_SHIPPING_THRESHOLD = 500_000;

/** Primary navigation — used by Navbar + MobileMenu. `tKey` = i18n key. */
export const NAV_LINKS = [
  { label: "Shop", tKey: "nav.shop", href: "/shop" },
  { label: "Collections", tKey: "nav.collections", href: "/collections" },
  { label: "Sale", tKey: "nav.sale", href: "/shop/sale" },
  { label: "Journal", tKey: "nav.journal", href: "/journal" },
  { label: "About", tKey: "nav.about", href: "/about" },
] as const;

/** Footer link columns. */
export const FOOTER_LINKS = {
  shop: [
    { label: "All Products", tKey: "footer.allProducts", href: "/shop" },
    { label: "Collections", tKey: "footer.collections", href: "/collections" },
    { label: "Sale", tKey: "footer.sale", href: "/shop/sale" },
    { label: "New Arrivals", tKey: "footer.newArrivals", href: "/shop?sort=newest" },
  ],
  info: [
    { label: "About", tKey: "footer.about", href: "/about" },
    { label: "Journal", tKey: "footer.journal", href: "/journal" },
    { label: "Sustainability", tKey: "footer.sustainability", href: "/about#sustainability" },
    { label: "Size Guide", tKey: "footer.sizeGuide", href: "/size-guide" },
  ],
  support: [
    { label: "Contact", tKey: "footer.contact", href: "/contact" },
    { label: "FAQ", tKey: "footer.faq", href: "/faq" },
    { label: "Shipping Policy", tKey: "footer.shippingPolicy", href: "/shipping" },
    { label: "Return Policy", tKey: "footer.returnPolicy", href: "/returns" },
    { label: "Privacy Policy", tKey: "footer.privacy", href: "/privacy-policy" },
    { label: "Terms & Conditions", tKey: "footer.terms", href: "/terms" },
  ],
} as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/luxafoir" },
  { label: "TikTok", href: "https://tiktok.com/@luxafoir" },
] as const;

/** Standard apparel size order for sorting selectors. */
export const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export const ANNOUNCEMENT_TEXT =
  "FREE SHIPPING FOR ORDERS ABOVE RP500.000 — SHOP NOW";

export const ANNOUNCEMENT_DISMISS_KEY = "luxafoir:announcement-dismissed";
export const NEWSLETTER_COOKIE_KEY = "luxafoir:newsletter-seen";
export const RECENTLY_VIEWED_KEY = "luxafoir:recently-viewed";
export const RECENT_SEARCHES_KEY = "luxafoir:recent-searches";
