import type { Product, Category, Collection } from "@/types/product";

/**
 * Mock catalog — self-hosted monochrome SVG mockups (public/mockups/, generated
 * by scripts/generate-mockups.mjs) so the storefront reads like an actual
 * Indonesian streetwear label without depending on fragile external photo URLs.
 * Replace these getters with Prisma/Supabase queries once the DB is live; the
 * rest of the app only depends on the shapes.
 */

// Local studio mockup path (clean monochrome, brand watermark, never 404s).
export const m = (file: string) => `/mockups/${file}.svg`;

// Two-image set per product (front + alternate) for the hover swap.
const pair = (front: string, back: string) => [m(front), m(back)];

export const CATEGORIES: Category[] = [
  { id: "cat-tshirt", name: "T-Shirt", slug: "tshirt", image: m("tee-black") },
  { id: "cat-longsleeve", name: "Long Sleeve", slug: "longsleeve", image: m("longsleeve-black") },
  { id: "cat-hoodie", name: "Hoodie", slug: "hoodie", image: m("hoodie-black") },
  { id: "cat-pants", name: "Pants", slug: "pants", image: m("widepants-black") },
  { id: "cat-shorts", name: "Shorts", slug: "shorts", image: m("shorts-black") },
];

export const COLLECTIONS: Collection[] = [
  {
    id: "col-essentials",
    name: "Essentials",
    slug: "distinct-001",
    description: "Dasar dari semua outfit. Hitam. Putih. Tidak pernah salah.",
    image: m("col-essentials"),
    isActive: true,
    startDate: null,
    endDate: null,
  },
  {
    id: "col-heavyweight",
    name: "Heavyweight",
    slug: "obsidian-hour",
    description: "Hoodie 420gsm. Tee 240gsm. Untuk yang mau terasa ada di badannya.",
    image: m("col-heavyweight"),
    isActive: true,
    startDate: null,
    endDate: null,
  },
  {
    id: "col-utility",
    name: "Utility",
    slug: "monsoon",
    description: "Gombrang, cargo, jogger. Celana skena yang bebas dan tidak dikekang.",
    image: m("col-utility"),
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
  categoryId: string;
  collectionId?: string;
  sizes: string[];
  tags?: string[];
  isFeatured?: boolean;
  soldOut?: boolean;
  images: string[];
  desc: string;
  material: string;
}

const SEEDS: Seed[] = [
  // ── KAOS / T-SHIRTS ──────────────────────────────────────────
  {
    name: "VOID Boxy Tee / Black",
    slug: "void-boxy-tee-black",
    price: 275_000,
    categoryId: "cat-tshirt",
    collectionId: "col-essentials",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tags: ["essentials", "boxy", "cotton"],
    isFeatured: true,
    images: pair("tee-black", "fabric-black"),
    desc: "Bukan kaos biasa. Potongan boxy oversized dengan dropped shoulder yang bikin bahu kamu drop dengan sendirinya. Cotton 240gsm yang berat dan jatuh rapi di badan. Hitam yang tidak pudar walau dicuci berkali-kali. Ini fondasi lemari kamu.",
    material: "100% cotton combed 240gsm. Heavyweight, dropped shoulder, jahitan rantai di kerah. Pre-shrunk biar nggak ngaret setelah dicuci.",
  },
  {
    name: "PHANTOM Boxy Tee / White",
    slug: "phantom-boxy-tee-white",
    price: 275_000,
    categoryId: "cat-tshirt",
    collectionId: "col-essentials",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tags: ["essentials", "boxy", "cotton"],
    isFeatured: true,
    images: pair("tee-white", "fabric-white"),
    desc: "Sama berat, sama boxy-nya kayak VOID — tapi putih bersih. Kaos polos yang tidak polos-polos amat. 240gsm yang nahan bentuk, kerah yang nggak melar. Putih yang berani kotor karena kualitasnya bikin kamu pede pakai tiap hari.",
    material: "100% cotton combed 240gsm. Heavyweight, dropped shoulder. Warna putih solid, anti-transparan walau bahannya tebal.",
  },
  {
    name: "CORRUPT Graphic Tee / Black",
    slug: "corrupt-graphic-tee-black",
    price: 315_000,
    comparePrice: 385_000,
    categoryId: "cat-tshirt",
    collectionId: "col-heavyweight",
    sizes: ["S", "M", "L", "XL"],
    tags: ["new", "sale", "graphic", "heavyweight"],
    isFeatured: true,
    images: pair("teeprint-black", "tee-black"),
    desc: "Boxy oversized dengan premium screen print yang nggak retak setengah mati setelah cuci ketiga. Tinta plastisol tebal, sablon rapi, badan 240gsm. Buat yang mau statement tapi tetap clean. Stok grafis ini terbatas.",
    material: "100% cotton combed 240gsm. Sablon plastisol premium, high-density. Boxy fit, dropped shoulder.",
  },
  {
    name: "FRAGMENT Washed Tee / Black",
    slug: "fragment-washed-tee-black",
    price: 335_000,
    categoryId: "cat-tshirt",
    collectionId: "col-heavyweight",
    sizes: ["S", "M", "L", "XL"],
    tags: ["new", "washed", "heavyweight"],
    images: pair("teewashed-black", "fabric-black"),
    desc: "Enzyme washed sampai dapet tekstur vintage yang susah dipalsuin. Hitamnya udah faded dari awal, jadi makin lama makin punya karakter. Boxy, berat, dan kelihatan kayak udah kamu pakai bertahun-tahun. Padahal baru.",
    material: "100% cotton combed 240gsm, enzyme wash. Efek faded vintage, tekstur lembut. Tiap potong sedikit beda — itu memang maksudnya.",
  },

  // ── LONGSLEEVE ───────────────────────────────────────────────
  {
    name: "SPECTER Longsleeve / Black",
    slug: "specter-longsleeve-black",
    price: 335_000,
    categoryId: "cat-longsleeve",
    collectionId: "col-essentials",
    sizes: ["S", "M", "L", "XL"],
    tags: ["new", "essentials", "cotton"],
    images: pair("longsleeve-black", "fabric-black"),
    desc: "Longsleeve boxy dengan dropped shoulder dan ribbed cuff yang nyangkut pas di pergelangan. Dipakai sendiri oke, dijadiin layering juga jadi. Bahan midweight yang nggak gerah tapi tetap nahan bentuk. Simpel, tapi niat.",
    material: "Cotton combed 220gsm. Dropped shoulder, ribbed cuff di pergelangan. Potongan boxy, panjang badan pas buat di-layer.",
  },

  // ── HOODIES ──────────────────────────────────────────────────
  {
    name: "OBSIDIAN Heavyweight Hoodie / Black",
    slug: "obsidian-heavyweight-hoodie-black",
    price: 585_000,
    comparePrice: 685_000,
    categoryId: "cat-hoodie",
    collectionId: "col-heavyweight",
    sizes: ["S", "M", "L", "XL", "XXL"],
    tags: ["sale", "heavyweight", "fleece"],
    isFeatured: true,
    images: pair("hoodie-black", "fabric-black"),
    desc: "420gsm. Ini bukan hoodie tipis yang langsung melar. Berat, hangat, dengan kangaroo pocket yang dalem dan hood double-layer yang berdiri sendiri. Oversized fit. Begitu kamu pakai, kamu ngerti kenapa harganya segini. Untuk yang mau terasa ada di badannya.",
    material: "Fleece cotton 420gsm, brushed back. Kangaroo pocket, hood dua lapis, ribbing tebal di cuff dan pinggang. Oversized fit.",
  },
  {
    name: "VOID Zip Hoodie / Black",
    slug: "void-zip-hoodie-black",
    price: 545_000,
    categoryId: "cat-hoodie",
    collectionId: "col-heavyweight",
    sizes: ["S", "M", "L", "XL"],
    tags: ["new", "heavyweight", "fleece"],
    isFeatured: true,
    images: pair("ziphoodie-black", "hoodie-black"),
    desc: "Full-zip 380gsm yang dibikin buat layering. Resleting YKH yang halus, badan yang cukup berat buat berdiri sendiri tapi nggak bikin gerah. Buka-tutup gampang, dipakai di atas tee atau di bawah jaket sama enaknya. Piece serbaguna yang bakal sering kamu pakai.",
    material: "Fleece cotton 380gsm, brushed back. Full-zip metal, hood double-layer, ribbing di cuff & hem. Fit sedikit lebih ramping dari OBSIDIAN.",
  },

  // ── CELANA SKENA / PANTS ─────────────────────────────────────
  {
    name: "GOMBRANG Wide Pants / Black",
    slug: "gombrang-wide-pants-black",
    price: 485_000,
    categoryId: "cat-pants",
    collectionId: "col-utility",
    sizes: ["S", "M", "L", "XL"],
    tags: ["new", "utility", "wide"],
    isFeatured: true,
    images: pair("widepants-black", "fabric-black"),
    desc: "Gombrang beneran. Wide leg yang loose dari paha sampai ujung, siluet skena yang nggak mengekang gerak. Pinggang elastis plus drawstring, bahan twill yang jatuh berat. Buat yang capek sama celana ketat dan mau bebas.",
    material: "Cotton twill 280gsm. Wide leg, pinggang elastis + drawstring, saku samping dalam. Jatuh berat, nggak ngembang.",
  },
  {
    name: "BAGGY Cargo Pants / Black",
    slug: "baggy-cargo-pants-black",
    price: 525_000,
    categoryId: "cat-pants",
    collectionId: "col-utility",
    sizes: ["S", "M", "L", "XL"],
    tags: ["new", "utility", "cargo"],
    images: pair("cargo-black", "widepants-black"),
    desc: "Baggy cargo dengan 6 kantong yang beneran muat barang, bukan cuma hiasan. Terinspirasi skate dan skena, potongannya longgar tapi tetap rapi. Twill tebal yang tahan banting. Fungsional tanpa norak.",
    material: "Cotton twill 300gsm. 6 kantong (2 samping cargo dengan flap + 2 depan + 2 belakang). Baggy fit, hem lebar.",
  },
  {
    name: "SKENA Jogger Pants / Black",
    slug: "skena-jogger-pants-black",
    price: 445_000,
    categoryId: "cat-pants",
    collectionId: "col-utility",
    sizes: ["S", "M", "L", "XL"],
    tags: ["utility", "jogger", "fleece"],
    images: pair("jogger-black", "fabric-black"),
    desc: "Atasnya oversized, bawahnya tapered, ditutup ribbed cuff yang ngegantung pas. Siluet jogger yang lagi jadi seragam anak skena. Bahan fleece yang adem buat sehari-hari, gampang dipaduin sama apa aja. Nyaman tanpa terlihat malas.",
    material: "Fleece cotton 320gsm. Tapered fit, ribbed cuff, pinggang elastis + drawstring. Saku samping dalam.",
  },

  // ── SHORTS ───────────────────────────────────────────────────
  {
    name: "BASIC Loose Shorts / Black",
    slug: "basic-loose-shorts-black",
    price: 245_000,
    categoryId: "cat-shorts",
    collectionId: "col-essentials",
    sizes: ["S", "M", "L", "XL"],
    tags: ["essentials", "shorts"],
    images: pair("shorts-black", "fabric-black"),
    desc: "Loose fit selutut dengan drawstring, dasar yang kamu butuh buat hari panas. Nggak neko-neko, nggak ketat, bahan yang adem. Dipakai di rumah, ke warung, atau buat olahraga sama enaknya. Murah meriah tapi nggak murahan.",
    material: "Cotton terry 260gsm. Loose fit, panjang selutut, pinggang elastis + drawstring, saku samping.",
  },
  {
    name: "WASHED Skate Shorts / Black",
    slug: "washed-skate-shorts-black",
    price: 275_000,
    comparePrice: 325_000,
    categoryId: "cat-shorts",
    sizes: ["S", "M", "L", "XL"],
    tags: ["new", "sale", "washed", "shorts"],
    images: pair("shortswashed-black", "fabric-black"),
    desc: "Washed black dengan efek faded yang skate banget. Lebih panjang dan loose dari basic, dibikin buat gerak. Hitamnya udah sedikit pudar dari awal jadi makin dipakai makin keren. Buat yang main board atau cuma pengin tampil kayak main board.",
    material: "Cotton twill 280gsm, garment wash. Loose skate fit, efek faded, drawstring. Tiap potong punya pudaran yang sedikit beda.",
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
    categoryId: s.categoryId,
    category: CATEGORIES.find((c) => c.id === s.categoryId),
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
