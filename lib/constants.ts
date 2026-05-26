/** Free shipping kicks in above this subtotal (IDR). */
export const FREE_SHIPPING_THRESHOLD = 500_000;

/** Primary navigation — used by Navbar + MobileMenu. */
export const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Sale", href: "/shop/sale" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
] as const;

/** Footer link columns. */
export const FOOTER_LINKS = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "Collections", href: "/collections" },
    { label: "Sale", href: "/shop/sale" },
    { label: "New Arrivals", href: "/shop?sort=newest" },
  ],
  info: [
    { label: "About", href: "/about" },
    { label: "Journal", href: "/journal" },
    { label: "Sustainability", href: "/about#sustainability" },
    { label: "Size Guide", href: "/size-guide" },
  ],
  support: [
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Return Policy", href: "/returns" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
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
