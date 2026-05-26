import type { Product, Category, Collection } from "@/types/product";

/**
 * Mock catalog — driven entirely by the user's self-hosted product photos in
 * public/products/{BOXY,HOODIE,PANTS}/. No external/web image hotlinks.
 * Replace these getters with Prisma/Supabase queries once the DB is live; the
 * rest of the app only depends on the shapes.
 */

// Local product image: pass the path relative to public/products/.
const im = (file: string) => `/products/${file}`;

export const CATEGORIES: Category[] = [
  { id: "cat-tshirt", name: "T-Shirt", slug: "tshirt", image: im("BOXY/boxy-black-dont-let-fear.jpg") },
  { id: "cat-hoodie", name: "Hoodie", slug: "hoodie", image: im("HOODIE/hoodie-oversized-black-plain.jpg") },
  { id: "cat-pants", name: "Pants", slug: "pants", image: im("PANTS/pants-baggy-light-blue-wide-leg.jpg") },
];

export const COLLECTIONS: Collection[] = [
  {
    id: "col-essentials",
    name: "Essentials",
    slug: "distinct-001",
    description: "Boxy tee premium dengan grafis. Oversized, sedikit cropped, jatuh berat.",
    image: im("BOXY/boxy-white-sweet-culture.jpg"),
    isActive: true,
    startDate: null,
    endDate: null,
  },
  {
    id: "col-heavyweight",
    name: "Heavyweight",
    slug: "obsidian-hour",
    description: "Hoodie oversized 400gsm+. Berat, hangat, terasa ada di badan.",
    image: im("HOODIE/hoodie-oversized-black-story-of-human.jpg"),
    isActive: true,
    startDate: null,
    endDate: null,
  },
  {
    id: "col-utility",
    name: "Utility",
    slug: "monsoon",
    description: "Celana skena gombrang — baggy, flare, washed. Bebas, tidak dikekang.",
    image: im("PANTS/pants-baggy-blue-flare-beach.jpg"),
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

const TEE = ["S", "M", "L", "XL"];
const TEE_XL = ["S", "M", "L", "XL", "XXL"];
const HOOD = ["S", "M", "L", "XL", "XXL"];

const SEEDS: Seed[] = [
  // ── BOXY TEES (cat-tshirt · Essentials) ──────────────────────
  {
    name: "Dont Let Fear Boxy Tee / Black",
    slug: "dont-let-fear-boxy-tee-black",
    price: 289_000,
    categoryId: "cat-tshirt",
    collectionId: "col-essentials",
    sizes: TEE_XL,
    tags: ["new", "boxy", "graphic"],
    isFeatured: true,
    images: [im("BOXY/boxy-black-dont-let-fear.jpg")],
    desc: "Boxy fit oversized dengan grafis 'DON'T LET YOUR FEAR DECIDE YOUR FUTURE' dan aksen bintang merah. Dibuat dari cotton combed 240gsm — heavyweight, jatuh terstruktur, dan dibuat untuk bertahan bertahun-tahun. Sebuah statement piece untuk yang melangkah dengan yakin.",
    material: "100% cotton combed 240gsm. Boxy oversized fit, sedikit cropped, dropped shoulder. Sablon plastisol premium, anti-retak.",
  },
  {
    name: "Hall of Fame Boxy Tee / Black",
    slug: "hall-of-fame-boxy-tee-black",
    price: 299_000,
    categoryId: "cat-tshirt",
    collectionId: "col-essentials",
    sizes: TEE,
    tags: ["boxy", "graphic"],
    images: [im("BOXY/boxy-black-hall-of-fame.jpg")],
    desc: "Grafis 'HALL OF FAME' bergaya liquid ungu yang berdiri tegas di dada. Boxy oversized dengan body tebal dan sablon high-detail. Bold namun tetap clean — untuk yang tampil beda dengan selera.",
    material: "100% cotton combed 240gsm. Boxy oversized fit, dropped shoulder. Sablon plastisol high-density.",
  },
  {
    name: "OOTD Supply Boxy Tee / Black",
    slug: "ootd-supply-boxy-tee-black",
    price: 269_000,
    categoryId: "cat-tshirt",
    collectionId: "col-essentials",
    sizes: TEE,
    tags: ["boxy", "graphic"],
    images: [im("BOXY/boxy-black-ootdsupply-logo.jpg")],
    desc: "Logo 'ootdsupply' minimalis di tengah dada. Bersih, boxy, oversized — esensial yang mudah dipadupadankan tapi tetap punya identitas.",
    material: "100% cotton combed 240gsm. Boxy oversized fit, dropped shoulder.",
  },
  {
    name: "Serenity Boxy Tee / Black",
    slug: "serenity-boxy-tee-black",
    price: 309_000,
    categoryId: "cat-tshirt",
    collectionId: "col-essentials",
    sizes: TEE,
    tags: ["new", "boxy", "graphic"],
    isFeatured: true,
    images: [im("BOXY/boxy-black-serenity-incr.jpg")],
    desc: "Sablon 'Serenity' bergaya gothic dengan detail artwork dan mark ®. Boxy heavyweight yang jatuh berat dan tenang. Premium streetwear dengan karakter gelap yang elegan.",
    material: "100% cotton combed 250gsm. Boxy oversized fit, sedikit cropped, dropped shoulder. Sablon plastisol detail.",
  },
  {
    name: "Trust Your Heart Boxy Tee / Black",
    slug: "trust-your-heart-boxy-tee-black",
    price: 299_000,
    categoryId: "cat-tshirt",
    collectionId: "col-essentials",
    sizes: TEE,
    tags: ["boxy", "graphic"],
    images: [im("BOXY/boxy-black-trust-your-heart.jpg")],
    desc: "Sablon 'TRUST YOUR HEART' dengan grafis hati pink. Boxy oversized yang soft di kulit namun tetap berat di siluet — pesan hangat dalam potongan yang tegas.",
    material: "100% cotton combed 240gsm. Boxy oversized fit, dropped shoulder. Sablon plastisol.",
  },
  {
    name: "Where Is My Mind Boxy Tee / Black",
    slug: "where-is-my-mind-boxy-tee-black",
    price: 315_000,
    comparePrice: 369_000,
    categoryId: "cat-tshirt",
    collectionId: "col-essentials",
    sizes: TEE,
    tags: ["sale", "boxy", "graphic"],
    isFeatured: true,
    images: [im("BOXY/boxy-black-where-is-my-mind.jpg")],
    desc: "Sablon besar 'WHERE IS MY MIND' dengan siluet biru di tengah. Bold, boxy, dan oversized — statement piece yang terbaca dari kejauhan. Stok terbatas.",
    material: "100% cotton combed 250gsm. Boxy oversized fit, sedikit cropped, dropped shoulder. Sablon plastisol high-density.",
  },
  {
    name: "Noversation Boxy Tee / White",
    slug: "noversation-boxy-tee-white",
    price: 279_000,
    categoryId: "cat-tshirt",
    collectionId: "col-essentials",
    sizes: TEE,
    tags: ["boxy", "graphic"],
    images: [im("BOXY/boxy-white-noversation-wush.jpg")],
    desc: "Putih bersih dengan sablon 'Noversation — Wush Club' dan garis kontras di bahu. Boxy oversized yang fresh dan clean — untuk yang percaya diri tampil dalam putih.",
    material: "100% cotton combed 240gsm. Boxy oversized fit, dropped shoulder. Putih solid, sablon plastisol.",
  },
  {
    name: "Sweet Culture Boxy Tee / White",
    slug: "sweet-culture-boxy-tee-white",
    price: 289_000,
    categoryId: "cat-tshirt",
    collectionId: "col-essentials",
    sizes: TEE_XL,
    tags: ["boxy", "graphic"],
    isFeatured: true,
    images: [im("BOXY/boxy-white-sweet-culture.jpg")],
    desc: "Backprint besar 'SWEET CULTURE' dalam siluet boxy oversized. Putih bersih dari cotton combed 240gsm — clean look yang langsung jadi begitu dikenakan.",
    material: "100% cotton combed 240gsm. Oversize boxy fit, sedikit cropped. Putih solid, backprint plastisol.",
  },

  // ── HOODIES (cat-hoodie · Heavyweight) ───────────────────────
  {
    name: "Oversized Hoodie / Black",
    slug: "oversized-hoodie-black",
    price: 549_000,
    categoryId: "cat-hoodie",
    collectionId: "col-heavyweight",
    sizes: HOOD,
    tags: ["boxy", "fleece"],
    isFeatured: true,
    images: [im("HOODIE/hoodie-oversized-black-plain.jpg")],
    desc: "Hoodie oversized polos — esensial paling dasar. Fleece 400gsm yang berat dan hangat, kangaroo pocket dalam, dan hood double-layer. Hitam pekat yang tidak pernah salah.",
    material: "Fleece cotton 400gsm, brushed back. Oversized fit, kangaroo pocket, ribbing tebal di cuff & hem.",
  },
  {
    name: "Rockstar Art Hoodie / Black",
    slug: "rockstar-art-hoodie-black",
    price: 629_000,
    comparePrice: 699_000,
    categoryId: "cat-hoodie",
    collectionId: "col-heavyweight",
    sizes: HOOD,
    tags: ["sale", "boxy", "fleece", "graphic"],
    isFeatured: true,
    images: [im("HOODIE/hoodie-oversized-black-rockstar-art-dist.jpg")],
    desc: "Hoodie oversized hitam dengan artwork 'ROCKSTAR ART DIST' di depan. Heavyweight 420gsm yang dramatis dan jatuh penuh. Premium piece dengan stok terbatas.",
    material: "Fleece cotton 420gsm, brushed back. Oversized fit, kangaroo pocket, hood double-layer. Sablon artwork detail.",
  },
  {
    name: "Screamed Hoodie / Black",
    slug: "screamed-hoodie-black",
    price: 599_000,
    categoryId: "cat-hoodie",
    collectionId: "col-heavyweight",
    sizes: HOOD,
    tags: ["boxy", "fleece", "graphic"],
    images: [im("HOODIE/hoodie-oversized-black-screamed.jpg")],
    desc: "Hoodie oversized dengan grafis 'SCREAMED' yang clean di dada. Fleece 400gsm — hangat, berat, dan tenang. Gelap dan premium tanpa berlebihan.",
    material: "Fleece cotton 400gsm, brushed back. Oversized fit, kangaroo pocket, ribbing tebal.",
  },
  {
    name: "Story of Human Hoodie / Black",
    slug: "story-of-human-hoodie-black",
    price: 649_000,
    categoryId: "cat-hoodie",
    collectionId: "col-heavyweight",
    sizes: HOOD,
    tags: ["new", "boxy", "fleece", "graphic"],
    isFeatured: true,
    images: [im("HOODIE/hoodie-oversized-black-story-of-human.jpg")],
    desc: "Hoodie oversized hitam dengan artwork emas klasik di lengan — 'Story of Human'. Heavyweight 420gsm. Flagship piece yang menaikkan level setiap look.",
    material: "Fleece cotton 420gsm, brushed back. Oversized fit, sleeve artwork emas, hood double-layer.",
  },
  {
    name: "Tennessee Whiskey Zip Hoodie / Blue",
    slug: "tennessee-whiskey-zip-hoodie-blue",
    price: 619_000,
    categoryId: "cat-hoodie",
    collectionId: "col-heavyweight",
    sizes: HOOD,
    tags: ["new", "boxy", "fleece", "zip"],
    images: [im("HOODIE/hoodie-oversized-blue-tennessee-whiskey-zip.jpg")],
    desc: "Full-zip hoodie dalam dusty blue dengan bordir 'WHISKEY'. Fleece 380gsm — layering piece yang clean dan adem. Warna yang berani tampil beda.",
    material: "Fleece cotton 380gsm, brushed back. Full-zip metal, oversized fit, hood double-layer. Warna dusty blue.",
  },
  {
    name: "Pray the Lord Hoodie / Cream",
    slug: "pray-the-lord-hoodie-cream",
    price: 599_000,
    categoryId: "cat-hoodie",
    collectionId: "col-heavyweight",
    sizes: HOOD,
    tags: ["new", "boxy", "fleece", "graphic"],
    images: [im("HOODIE/hoodie-oversized-cream-pray-the-lord.jpg")],
    desc: "Hoodie oversized warna cream dengan artwork spray biru 'pray the lord'. Fleece 400gsm yang hangat dan lembut. Tone netral yang mudah dipadupadankan.",
    material: "Fleece cotton 400gsm, brushed back. Oversized fit, kangaroo pocket. Warna cream, sablon spray artwork.",
  },
  {
    name: "Rockstar Art Hoodie / Grey",
    slug: "rockstar-art-hoodie-grey",
    price: 629_000,
    categoryId: "cat-hoodie",
    collectionId: "col-heavyweight",
    sizes: HOOD,
    tags: ["boxy", "fleece", "graphic"],
    images: [im("HOODIE/hoodie-oversized-grey-rockstar-art-dist.jpg")],
    desc: "Versi grey dari Rockstar Art — artwork 'ROCKSTAR ART DIST' dengan garis di lengan. Heavyweight 420gsm. Light grey yang terasa premium.",
    material: "Fleece cotton 420gsm, brushed back. Oversized fit, sleeve stripes, hood double-layer. Warna light grey.",
  },

  // ── PANTS (cat-pants · Utility) ──────────────────────────────
  {
    name: "Baggy Flare Jeans / Blue",
    slug: "baggy-flare-jeans-blue",
    price: 489_000,
    categoryId: "cat-pants",
    collectionId: "col-utility",
    sizes: TEE,
    tags: ["new", "baggy", "denim"],
    isFeatured: true,
    images: [im("PANTS/pants-baggy-blue-flare-beach.jpg")],
    desc: "Baggy flare jeans biru dengan whisker wash. Gombrang dari paha hingga melebar di ujung — siluet skena yang bebas dan bergaya. Premium denim yang nyaman dipakai seharian.",
    material: "Premium cotton denim, baggy flare fit, mid-rise. Whisker wash biru klasik, belt loop.",
  },
  {
    name: "Faded Baggy Jeans / Blue",
    slug: "faded-baggy-jeans-blue",
    price: 469_000,
    categoryId: "cat-pants",
    collectionId: "col-utility",
    sizes: TEE,
    tags: ["baggy", "denim"],
    images: [im("PANTS/pants-baggy-faded-blue-back.jpg")],
    desc: "Baggy jeans dengan faded wash biru pudar yang vintage. Potongan lebar dan jatuh berat — makin sering dipakai, makin berkarakter.",
    material: "Premium cotton denim, baggy straight fit, mid-rise. Faded wash, saku belakang klasik.",
  },
  {
    name: "Washed Flare Jeans / Grey",
    slug: "washed-flare-jeans-grey",
    price: 499_000,
    categoryId: "cat-pants",
    collectionId: "col-utility",
    sizes: TEE,
    tags: ["new", "baggy", "denim"],
    isFeatured: true,
    images: [im("PANTS/pants-baggy-grey-washed-flare.jpg")],
    desc: "Flare jeans abu dengan washed effect yang moody. Gombrang dan melebar di bawah — warna netral yang mudah dipasangkan dengan atasan apa pun.",
    material: "Premium cotton denim, baggy flare fit, mid-rise. Grey washed effect, belt loop.",
  },
  {
    name: "Wide Leg Jeans / Light Blue",
    slug: "wide-leg-jeans-light-blue",
    price: 479_000,
    categoryId: "cat-pants",
    collectionId: "col-utility",
    sizes: TEE,
    tags: ["baggy", "denim"],
    images: [im("PANTS/pants-baggy-light-blue-wide-leg.jpg"), im("PANTS/pants-baggy-light-blue-front.jpg")],
    desc: "Wide leg jeans biru muda yang clean dan adem. Gombrang lurus dari pinggang sampai ujung — light wash yang fresh untuk outfit harian.",
    material: "Premium cotton denim, wide leg fit, mid-rise. Light blue wash, jatuh lurus.",
  },
  {
    name: "INF Baggy Jeans / Light Blue",
    slug: "inf-baggy-jeans-light-blue",
    price: 459_000,
    categoryId: "cat-pants",
    collectionId: "col-utility",
    sizes: TEE,
    tags: ["new", "baggy", "denim"],
    images: [im("PANTS/pants-baggy-light-blue-inf-back.jpg")],
    desc: "Baggy jeans light blue dengan detail branding 'inf'. Gombrang dengan washed lembut dan siluet skate yang santai — relaxed tanpa kehilangan bentuk.",
    material: "Premium cotton denim, baggy fit, mid-rise. Light blue wash, detail branding inf.",
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
