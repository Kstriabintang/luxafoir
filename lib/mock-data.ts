import type { Product, Category, Collection } from "@/types/product";

/**
 * Mock catalog — PREMIUM BOXY / OVERSIZED tshirts only. Garments are strictly
 * BLACK or WHITE colorways (no other colors). Product imagery = clean product
 * MOCKUPS (no models — flat lay / hanger), full-color photos. Hero uses model
 * shots (see HeroSection). All Pexels IDs verified 200 + visually confirmed
 * black/white garments. Replace getters with Prisma/Supabase once the DB is live.
 */

// Pexels hotlink (free commercial use) — used for HERO/collection model shots.
export const px = (id: number, w = 900, h = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

// Local self-hosted product mockups (composited in scripts/generate-prints.sh):
// clean white-bg product-only shots with the LUXAFOIR graphic printed on.
const img = (file: string) => `/products/${file}.jpg`;

export const CATEGORIES: Category[] = [
  { id: "cat-tshirt", name: "T-Shirt", slug: "tshirt", image: img("void-front") },
];

export const COLLECTIONS: Collection[] = [
  {
    id: "col-essentials",
    name: "Essentials",
    slug: "distinct-001",
    description: "Boxy tshirt premium polos. Hitam atau putih. Dasar yang tidak pernah salah.",
    image: px(28758240, 1200, 1500),
    isActive: true,
    startDate: null,
    endDate: null,
  },
  {
    id: "col-heavyweight",
    name: "Heavyweight",
    slug: "obsidian-hour",
    description: "Boxy 240–280gsm. Berat, jatuh sempurna, sedikit cropped. Terasa ada di badan.",
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

// PREMIUM BOXY TSHIRTS — black & white only. Pexels IDs verified (product mockups).
const SEEDS: Seed[] = [
  // ── ESSENTIALS · boxy premium polos ──────────────────────────
  {
    name: "VOID Boxy Tshirt / Black",
    slug: "void-boxy-tshirt-black",
    price: 289_000,
    collectionId: "col-essentials",
    sizes: TEE_SIZES_XL,
    tags: ["essentials", "boxy", "cotton"],
    isFeatured: true,
    images: [img("void-front"), img("void-alt")],
    desc: "Boxy tshirt premium dengan potongan oversized yang sedikit cropped — jatuh pas di pinggang, bahu drop dengan sendirinya. Cotton combed 240gsm yang berat dan rapi. Hitam pekat yang tidak pudar walau dicuci berkali-kali. Bukan kaos biasa, ini staple premium kamu.",
    material: "100% cotton combed 240gsm. Boxy oversized fit, sedikit cropped, dropped shoulder. Pre-shrunk, jahitan rapi, kerah anti-melar.",
  },
  {
    name: "PHANTOM Boxy Tshirt / White",
    slug: "phantom-boxy-tshirt-white",
    price: 289_000,
    collectionId: "col-essentials",
    sizes: TEE_SIZES_XL,
    tags: ["essentials", "boxy", "cotton"],
    isFeatured: true,
    images: [img("phantom-front"), img("phantom-alt")],
    desc: "Versi putih bersih dari VOID. Boxy oversized, sedikit cropped, badan 240gsm yang nahan bentuk. Putih solid yang anti-transparan walau bahannya tebal. Premium yang bikin kamu pede pakai tiap hari.",
    material: "100% cotton combed 240gsm. Boxy oversized fit, sedikit cropped, dropped shoulder. Putih solid, anti-transparan.",
  },
  {
    name: "STAPLE Boxy Tshirt / White",
    slug: "staple-boxy-tshirt-white",
    price: 269_000,
    collectionId: "col-essentials",
    sizes: TEE_SIZES,
    tags: ["essentials", "boxy", "cotton"],
    images: [img("staple-front"), img("staple-alt")],
    desc: "Boxy tshirt putih paling dasar yang wajib punya beberapa. Oversized, sedikit cropped, gampang dipaduin sama celana apa aja. Combed lembut di kulit, jahitan premium. Murah meriah tapi terasa mahal.",
    material: "100% cotton combed 230gsm. Boxy oversized fit, sedikit cropped, dropped shoulder. Putih solid.",
  },
  {
    name: "STATIC Boxy Tshirt / White",
    slug: "static-boxy-tshirt-white",
    price: 269_000,
    collectionId: "col-essentials",
    sizes: TEE_SIZES,
    tags: ["essentials", "boxy", "cotton"],
    images: [img("static-front"), img("static-alt")],
    desc: "Putih bersih, boxy, sedikit cropped. Dasar yang dipakai siapa aja dan tetap kelihatan rapi. Bahan combed yang adem dan jatuh berat. Premium tanpa banyak omong.",
    material: "100% cotton combed 230gsm. Boxy oversized fit, sedikit cropped. Putih solid.",
  },

  // ── HEAVYWEIGHT · boxy 240–280gsm ────────────────────────────
  {
    name: "SPECTER Boxy Tshirt / Black",
    slug: "specter-boxy-tshirt-black",
    price: 319_000,
    collectionId: "col-heavyweight",
    sizes: TEE_SIZES,
    tags: ["new", "boxy", "heavyweight"],
    isFeatured: true,
    images: [img("specter-front"), img("specter-alt")],
    desc: "Heavyweight 280gsm yang berat dan jatuh sempurna. Boxy oversized dengan potongan cropped yang clean. Hitam pekat, kerah tebal, jahitan rapi. Begitu kamu pakai, kamu ngerti bedanya heavyweight premium.",
    material: "100% cotton combed 280gsm heavyweight. Boxy oversized fit, sedikit cropped, dropped shoulder, kerah ribbing tebal.",
  },
  {
    name: "RIOT Boxy Tshirt / Black",
    slug: "riot-boxy-tshirt-black",
    price: 335_000,
    collectionId: "col-heavyweight",
    sizes: TEE_SIZES,
    tags: ["new", "boxy", "heavyweight"],
    isFeatured: true,
    images: [img("riot-front"), img("riot-alt")],
    desc: "Boxy heavyweight yang dibikin buat dipaduin sama celana gombrang. Satu look, semua benar. 280gsm, oversized, sedikit cropped, jatuh berat. Inilah seragam premium: boxy tshirt item, celana lebar, selesai.",
    material: "100% cotton combed 280gsm heavyweight. Boxy oversized fit, sedikit cropped, dropped shoulder.",
  },
  {
    name: "FRAGMENT Boxy Tshirt / White",
    slug: "fragment-boxy-tshirt-white",
    price: 319_000,
    collectionId: "col-heavyweight",
    sizes: TEE_SIZES,
    tags: ["new", "boxy", "heavyweight"],
    images: [img("fragment-front"), img("fragment-alt")],
    desc: "Heavyweight putih 280gsm dengan potongan boxy cropped. Berat, jatuh rapi, putih bersih yang berani. Premium piece buat yang nggak takut pakai putih.",
    material: "100% cotton combed 280gsm heavyweight. Boxy oversized fit, sedikit cropped. Putih solid.",
  },
  {
    name: "CORRUPT Boxy Tshirt / Black",
    slug: "corrupt-boxy-tshirt-black",
    price: 315_000,
    comparePrice: 379_000,
    collectionId: "col-heavyweight",
    sizes: TEE_SIZES,
    tags: ["sale", "boxy", "heavyweight"],
    isFeatured: true,
    images: [img("corrupt-front"), img("corrupt-alt")],
    desc: "Boxy heavyweight item dengan finishing premium — kerah tebal, jahitan rapi, jatuh berat. Oversized sedikit cropped, potongan yang lagi jadi seragam skena. Stok terbatas dengan harga spesial.",
    material: "100% cotton combed 280gsm heavyweight. Boxy oversized fit, sedikit cropped, dropped shoulder.",
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
