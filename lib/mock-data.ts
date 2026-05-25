import type { Product, Category, Collection } from "@/types/product";

/**
 * Mock catalog — real clothing photography (Unsplash) so the storefront reads
 * like an actual streetwear label. Replace these getters with Prisma/Supabase
 * queries once the DB is live; the rest of the app only depends on the shapes.
 */

// Unsplash clothing photo IDs (apparel only — no landscapes/abstract).
const PHOTOS = {
  tshirt: ["1583743814966-8936f5b7be1a", "1618354691438-25bc04584c23", "1521572163474-6864f9cf17ab"],
  hoodie: ["1509942774463-acf339cf87d5", "1556821840-3a63f15732ce"],
  pants: ["1624378439575-d8705ad7ae80", "1473966968600-fa801b869a1a"],
} as const;

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&h=1200&q=80`;

// Two-image set per product (front + alternate) for the hover swap.
const pair = (pool: readonly string[], offset = 0) =>
  [u(pool[offset % pool.length]), u(pool[(offset + 1) % pool.length])];

export const CATEGORIES: Category[] = [
  { id: "cat-tshirt", name: "T-Shirt", slug: "tshirt", image: u(PHOTOS.tshirt[0]) },
  { id: "cat-longsleeve", name: "Long Sleeve", slug: "longsleeve", image: u(PHOTOS.tshirt[1]) },
  { id: "cat-hoodie", name: "Hoodie", slug: "hoodie", image: u(PHOTOS.hoodie[0]) },
  { id: "cat-pants", name: "Pants", slug: "pants", image: u(PHOTOS.pants[0]) },
  { id: "cat-shorts", name: "Shorts", slug: "shorts", image: u(PHOTOS.pants[1]) },
];

export const COLLECTIONS: Collection[] = [
  {
    id: "col-essentials",
    name: "Essentials",
    slug: "distinct-001",
    description: "The core line. Heavyweight cotton staples built to be worn every day.",
    image: u(PHOTOS.tshirt[0]),
    isActive: true,
    startDate: null,
    endDate: null,
  },
  {
    id: "col-heavyweight",
    name: "Heavyweight",
    slug: "obsidian-hour",
    description: "Oversized silhouettes in premium heavyweight fabric. Structured, considered.",
    image: u(PHOTOS.hoodie[0]),
    isActive: true,
    startDate: null,
    endDate: null,
  },
  {
    id: "col-utility",
    name: "Utility",
    slug: "monsoon",
    description: "Technical streetwear shaped for the city — function as form.",
    image: u(PHOTOS.pants[0]),
    isActive: true,
    startDate: null,
    endDate: null,
  },
];

const STANDARD_SIZES = ["XS", "S", "M", "L", "XL"];

function variants(productId: string, stockMap: Record<string, number>) {
  return STANDARD_SIZES.map((size) => ({
    id: `${productId}-${size}`,
    size,
    stock: stockMap[size] ?? 0,
    sku: `${productId.toUpperCase()}-${size}`,
  }));
}

interface Seed {
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  categoryId: string;
  collectionId?: string;
  tags?: string[];
  isFeatured?: boolean;
  soldOut?: boolean;
  images: string[];
  desc: string;
}

const SEEDS: Seed[] = [
  // ── T-Shirts (Rp249.000 – Rp349.000) ──
  {
    name: "Essential Boxy Tee",
    slug: "essential-boxy-tee",
    price: 289_000,
    categoryId: "cat-tshirt",
    collectionId: "col-essentials",
    tags: ["new", "cotton"],
    isFeatured: true,
    images: pair(PHOTOS.tshirt, 0),
    desc: "A boxy, midweight cotton tee with a clean drop shoulder. The everyday foundation of the wardrobe.",
  },
  {
    name: "Heavyweight Box Tee",
    slug: "heavyweight-box-tee",
    price: 329_000,
    categoryId: "cat-tshirt",
    collectionId: "col-heavyweight",
    tags: ["cotton"],
    isFeatured: true,
    images: pair(PHOTOS.tshirt, 1),
    desc: "240gsm heavyweight cotton with structured drape and a relaxed body. Built to hold its shape.",
  },
  {
    name: "Oversized Logo Tee",
    slug: "oversized-logo-tee",
    price: 299_000,
    comparePrice: 349_000,
    categoryId: "cat-tshirt",
    tags: ["sale", "cotton"],
    images: pair(PHOTOS.tshirt, 2),
    desc: "Oversized fit with a subtle tonal logo. Pre-washed for an easy, lived-in hand-feel.",
  },
  {
    name: "Washed Cotton Tee",
    slug: "washed-cotton-tee",
    price: 259_000,
    categoryId: "cat-tshirt",
    collectionId: "col-essentials",
    tags: ["cotton"],
    images: pair(PHOTOS.tshirt, 0),
    desc: "Garment-dyed and washed for a soft, faded finish. A relaxed everyday staple.",
  },
  // ── Long Sleeve (Rp299.000 – Rp399.000) ──
  {
    name: "Essential Long Sleeve",
    slug: "essential-long-sleeve",
    price: 349_000,
    categoryId: "cat-longsleeve",
    collectionId: "col-essentials",
    tags: ["new", "cotton"],
    isFeatured: true,
    images: pair(PHOTOS.tshirt, 1),
    desc: "A clean long-sleeve in midweight cotton with ribbed cuffs. Layer it or wear it alone.",
  },
  {
    name: "Box Long Sleeve",
    slug: "box-long-sleeve",
    price: 389_000,
    categoryId: "cat-longsleeve",
    collectionId: "col-heavyweight",
    tags: ["cotton"],
    images: pair(PHOTOS.tshirt, 2),
    desc: "Boxy long-sleeve cut from heavyweight jersey with a structured shoulder.",
  },
  // ── Hoodies (Rp499.000 – Rp649.000) ──
  {
    name: "Heavyweight Hoodie",
    slug: "heavyweight-hoodie",
    price: 599_000,
    categoryId: "cat-hoodie",
    collectionId: "col-heavyweight",
    tags: ["new", "fleece"],
    isFeatured: true,
    images: pair(PHOTOS.hoodie, 0),
    desc: "Brushed-back heavyweight fleece with a double-lined hood and boxy fit. The flagship piece.",
  },
  {
    name: "Oversized Pullover Hoodie",
    slug: "oversized-pullover-hoodie",
    price: 649_000,
    categoryId: "cat-hoodie",
    collectionId: "col-heavyweight",
    tags: ["fleece"],
    isFeatured: true,
    images: pair(PHOTOS.hoodie, 1),
    desc: "An oversized pullover in premium loopback cotton. Dropped shoulders, heavy drape.",
  },
  {
    name: "Essential Zip Hoodie",
    slug: "essential-zip-hoodie",
    price: 549_000,
    comparePrice: 649_000,
    categoryId: "cat-hoodie",
    collectionId: "col-essentials",
    tags: ["sale", "fleece"],
    images: pair(PHOTOS.hoodie, 0),
    desc: "Full-zip hoodie in brushed fleece with a clean, minimal finish.",
  },
  // ── Pants (Rp449.000 – Rp549.000) ──
  {
    name: "Relaxed Cargo Pant",
    slug: "relaxed-cargo-pant",
    price: 499_000,
    categoryId: "cat-pants",
    collectionId: "col-utility",
    tags: ["new"],
    images: pair(PHOTOS.pants, 0),
    desc: "Relaxed cargo in durable cotton twill with utility pockets and a tapered ankle.",
  },
  {
    name: "Tapered Sweatpant",
    slug: "tapered-sweatpant",
    price: 459_000,
    categoryId: "cat-pants",
    tags: ["fleece"],
    soldOut: true,
    images: pair(PHOTOS.pants, 1),
    desc: "Tapered sweatpant in heavyweight fleece with ribbed cuffs and a clean elastic waist.",
  },
  {
    name: "Wide Leg Trouser",
    slug: "wide-leg-trouser",
    price: 529_000,
    categoryId: "cat-pants",
    collectionId: "col-heavyweight",
    tags: [],
    isFeatured: true,
    images: pair(PHOTOS.pants, 0),
    desc: "A wide-leg trouser with a pressed front and relaxed drape. Elevated streetwear tailoring.",
  },
  // ── Shorts (Rp199.000 – Rp299.000) ──
  {
    name: "Essential Sweat Short",
    slug: "essential-sweat-short",
    price: 249_000,
    categoryId: "cat-shorts",
    collectionId: "col-essentials",
    tags: ["fleece"],
    images: pair(PHOTOS.pants, 1),
    desc: "A 7-inch sweat short in brushed fleece. Easy, relaxed, every-day.",
  },
  {
    name: "Nylon Track Short",
    slug: "nylon-track-short",
    price: 219_000,
    comparePrice: 279_000,
    categoryId: "cat-shorts",
    collectionId: "col-utility",
    tags: ["sale", "technical"],
    images: pair(PHOTOS.pants, 0),
    desc: "Lightweight nylon track short with a mesh lining and elastic drawcord waist.",
  },
];

export const PRODUCTS: Product[] = SEEDS.map((s, idx) => {
  const id = `prod-${idx + 1}`;
  const soldOut = s.soldOut ?? false;
  return {
    id,
    name: s.name,
    slug: s.slug,
    description: s.desc,
    price: s.price,
    comparePrice: s.comparePrice ?? null,
    images: s.images,
    categoryId: s.categoryId,
    category: CATEGORIES.find((c) => c.id === s.categoryId),
    collectionId: s.collectionId ?? null,
    collection: COLLECTIONS.find((c) => c.id === s.collectionId) ?? null,
    variants: variants(
      id,
      soldOut
        ? { XS: 0, S: 0, M: 0, L: 0, XL: 0 }
        : { XS: 6, S: 12, M: 16, L: 10, XL: 4 }
    ),
    tags: s.tags ?? [],
    isFeatured: s.isFeatured ?? false,
    isActive: true,
    createdAt: new Date(2026, 4, 1 + idx).toISOString(),
  };
});

// ─── Query helpers (mirror the future Prisma data layer) ───
export const getAllProducts = () => PRODUCTS;
export const getFeaturedProducts = () => PRODUCTS.filter((p) => p.isFeatured);
export const getProductBySlug = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug) ?? null;
export const getProductById = (id: string) =>
  PRODUCTS.find((p) => p.id === id) ?? null;
export const getRelatedProducts = (product: Product, n = 4) =>
  PRODUCTS.filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .concat(PRODUCTS.filter((p) => p.id !== product.id && p.categoryId !== product.categoryId))
    .slice(0, n);
export const getProductsByCategory = (categorySlug: string) =>
  PRODUCTS.filter((p) => p.category?.slug === categorySlug);
export const getProductsByCollection = (collectionSlug: string) =>
  PRODUCTS.filter((p) => p.collection?.slug === collectionSlug);
export const getSaleProducts = () =>
  PRODUCTS.filter((p) => p.comparePrice && p.comparePrice > p.price);
export const getCategoryBySlug = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug) ?? null;
export const getCollectionBySlug = (slug: string) =>
  COLLECTIONS.find((c) => c.slug === slug) ?? null;
export const isProductSoldOut = (p: Product) =>
  p.variants.every((v) => v.stock === 0);
export const searchProducts = (query: string) => {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)) ||
      p.category?.name.toLowerCase().includes(q)
  );
};
