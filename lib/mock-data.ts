import type { Product, Category, Collection } from "@/types/product";

/**
 * Mock catalog — focused on BOXY / OVERSIZED tees only. The GARMENTS are
 * black & white colorways (the products themselves), but the photography is
 * full color. Imagery = free-to-use Pexels photos (verified 200, hotlink-legal).
 * Replace these getters with Prisma/Supabase queries once the DB is live.
 */

// Pexels hotlink (free commercial use). Portrait crop by default for cards.
export const px = (id: number, w = 900, h = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

const pair = (front: number, back: number) => [px(front), px(back)];

export const CATEGORIES: Category[] = [
  { id: "cat-tshirt", name: "T-Shirt", slug: "tshirt", image: px(28758241) },
];

export const COLLECTIONS: Collection[] = [
  {
    id: "col-essentials",
    name: "Essentials",
    slug: "distinct-001",
    description: "Boxy tee polos. Hitam. Putih. Dasar dari semua outfit skena.",
    image: px(28758240, 1200, 1500),
    isActive: true,
    startDate: null,
    endDate: null,
  },
  {
    id: "col-heavyweight",
    name: "Heavyweight",
    slug: "obsidian-hour",
    description: "Tee 240gsm dengan sablon premium. Boxy, berat, terasa ada di badan.",
    image: px(28338020, 1200, 1500),
    isActive: true,
    startDate: null,
    endDate: null,
  },
];

function variants(productId: string, sizes: string[], soldOut = false) {
  const stockBySize: Record<string, number> = { S: 14, M: 18, L: 16, XL: 9, XXL: 5 };
  return sizes.map((size) => ({
    id: `${productId}-${size}`,
    size,
    stock: soldOut ? 0 : stockBySize[size] ?? 8,
    sku: `${productId.toUpperCase()}-${size}`,
  }));
}

interface Seed {
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  collectionId?: string;
  sizes: string[];
  tags?: string[];
  isFeatured?: boolean;
  soldOut?: boolean;
  images: string[];
  desc: string;
  material: string;
}

const TEE_SIZES = ["S", "M", "L", "XL"];
const TEE_SIZES_XL = ["S", "M", "L", "XL", "XXL"];

// All BOXY TEES — black & white only. Pexels IDs verified to return 200.
const SEEDS: Seed[] = [
  // ── ESSENTIALS · boxy tee polos ──────────────────────────────
  {
    name: "VOID Boxy Tee / Black",
    slug: "void-boxy-tee-black",
    price: 275_000,
    collectionId: "col-essentials",
    sizes: TEE_SIZES_XL,
    tags: ["essentials", "boxy", "cotton"],
    isFeatured: true,
    images: pair(28758241, 9558567),
    desc: "Bukan kaos biasa. Potongan boxy oversized dengan dropped shoulder yang bikin bahu kamu drop dengan sendirinya. Cotton 240gsm yang berat dan jatuh rapi di badan. Hitam yang tidak pudar walau dicuci berkali-kali. Ini fondasi lemari kamu.",
    material: "100% cotton combed 240gsm. Heavyweight, dropped shoulder, boxy fit. Pre-shrunk biar nggak ngaret setelah dicuci.",
  },
  {
    name: "SPECTER Boxy Tee / Black",
    slug: "specter-boxy-tee-black",
    price: 269_000,
    collectionId: "col-essentials",
    sizes: TEE_SIZES,
    tags: ["essentials", "boxy", "cotton"],
    isFeatured: true,
    images: pair(9558588, 28758242),
    desc: "Boxy fit yang lebih cropped dikit, pas buat yang suka kelihatan body badannya. Bahan 230gsm yang adem tapi tetap nahan bentuk. Hitam solid, jahitan rapi, kerah yang nggak gampang melar. Simpel tapi niat.",
    material: "100% cotton combed 230gsm. Boxy cropped fit, dropped shoulder, jahitan rantai di kerah.",
  },
  {
    name: "STAPLE Boxy Tee / Black",
    slug: "staple-boxy-tee-black",
    price: 259_000,
    collectionId: "col-essentials",
    sizes: TEE_SIZES,
    tags: ["essentials", "boxy", "cotton"],
    images: pair(28758240, 28758239),
    desc: "Boxy tee paling dasar yang wajib punya minimal tiga. Oversized, jatuh longgar, gampang dipaduin sama celana apa aja. Bahan combed yang lembut di kulit. Murah meriah tapi nggak murahan.",
    material: "100% cotton combed 240gsm. Oversized boxy fit, dropped shoulder.",
  },
  {
    name: "PHANTOM Boxy Tee / White",
    slug: "phantom-boxy-tee-white",
    price: 275_000,
    collectionId: "col-essentials",
    sizes: TEE_SIZES_XL,
    tags: ["essentials", "boxy", "cotton"],
    isFeatured: true,
    images: [px(20736690)],
    desc: "Sama berat, sama boxy-nya kayak VOID — tapi putih bersih. Kaos polos yang tidak polos-polos amat. 240gsm yang nahan bentuk, kerah yang nggak melar. Putih yang berani kotor karena kualitasnya bikin kamu pede pakai tiap hari.",
    material: "100% cotton combed 240gsm. Boxy fit, dropped shoulder. Putih solid, anti-transparan walau tebal.",
  },

  // ── HEAVYWEIGHT · boxy tee sablon ────────────────────────────
  {
    name: "CORRUPT Graphic Tee / Black",
    slug: "corrupt-graphic-tee-black",
    price: 315_000,
    comparePrice: 385_000,
    collectionId: "col-heavyweight",
    sizes: TEE_SIZES,
    tags: ["new", "sale", "graphic", "heavyweight"],
    isFeatured: true,
    images: pair(36942017, 36942018),
    desc: "Boxy oversized dengan premium screen print yang nggak retak setengah mati setelah cuci ketiga. Tinta plastisol tebal, sablon rapi, badan 240gsm. Buat yang mau statement tapi tetap clean. Stok grafis ini terbatas.",
    material: "100% cotton combed 240gsm. Sablon plastisol premium high-density. Boxy fit, dropped shoulder.",
  },
  {
    name: "FRAGMENT Print Tee / Black",
    slug: "fragment-print-tee-black",
    price: 335_000,
    collectionId: "col-heavyweight",
    sizes: TEE_SIZES,
    tags: ["new", "graphic", "heavyweight"],
    images: pair(36942018, 36942017),
    desc: "Sablon teks bold yang gede di dada, tipe yang langsung kebaca dari jauh. Boxy, berat, dan kelihatan kayak udah kamu pakai bertahun-tahun. Buat yang suka grafis tapi anti norak.",
    material: "100% cotton combed 240gsm. Sablon plastisol high-density. Boxy oversized fit.",
  },
  {
    name: "STATIC Graphic Tee / White",
    slug: "static-graphic-tee-white",
    price: 325_000,
    collectionId: "col-heavyweight",
    sizes: TEE_SIZES,
    tags: ["new", "graphic", "heavyweight"],
    images: pair(36908588, 20736690),
    desc: "Versi putih dari seri sablon kami. Kontras teks hitam di bahan putih bersih, boxy oversized yang jatuh berat. Statement tanpa banyak omong. Cocok buat yang berani pakai putih.",
    material: "100% cotton combed 240gsm. Sablon plastisol. Boxy fit, putih solid.",
  },
  {
    name: "RIOT Boxy Tee / Black",
    slug: "riot-boxy-tee-black",
    price: 345_000,
    collectionId: "col-heavyweight",
    sizes: TEE_SIZES,
    tags: ["new", "boxy", "heavyweight"],
    isFeatured: true,
    images: pair(28338020, 28758241),
    desc: "Boxy tee 240gsm yang dibikin buat dipaduin sama celana gombrang skena. Satu look, semua benar. Hitam pekat, oversized, jatuh berat. Inilah seragam anak skena: kaos boxy, celana lebar, selesai.",
    material: "100% cotton combed 240gsm. Boxy oversized fit, dropped shoulder. Heavyweight, jatuh berat.",
  },
];

export const PRODUCTS: Product[] = SEEDS.map((s, idx) => {
  const id = `prod-${idx + 1}`;
  return {
    id,
    name: s.name,
    slug: s.slug,
    description: s.desc,
    material: s.material,
    price: s.price,
    comparePrice: s.comparePrice ?? null,
    images: s.images,
    categoryId: "cat-tshirt",
    category: CATEGORIES[0],
    collectionId: s.collectionId ?? null,
    collection: COLLECTIONS.find((c) => c.id === s.collectionId) ?? null,
    variants: variants(id, s.sizes, s.soldOut ?? false),
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
