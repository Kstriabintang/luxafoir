export interface JournalArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: "Collections" | "Behind the Brand" | "Style Guide";
  image: string;
  author: string;
  date: string; // ISO
  readingMinutes: number;
}

const img = (file: string) => `/products/${file}`;

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "the-obsidian-hour",
    title: "The Obsidian Hour",
    excerpt:
      "On darkness as a discipline — how the after-dark palette shaped our debut tailoring.",
    category: "Collections",
    image: img("HOODIE/hoodie-oversized-black-story-of-human.jpg"),
    author: "Studio LUXAFOIR",
    date: "2026-04-18",
    readingMinutes: 5,
  },
  {
    slug: "made-in-indonesia",
    title: "Made in Indonesia, Cut for the World",
    excerpt:
      "Inside the ateliers and the hands that finish every LUXAFOIR piece.",
    category: "Behind the Brand",
    image: img("BOXY/boxy-black-serenity-incr.jpg"),
    author: "Studio LUXAFOIR",
    date: "2026-03-30",
    readingMinutes: 7,
  },
  {
    slug: "layering-for-the-monsoon",
    title: "Layering for the Monsoon",
    excerpt:
      "A field guide to technical layering when the rains arrive — function as form.",
    category: "Style Guide",
    image: img("PANTS/pants-baggy-blue-flare-beach.jpg"),
    author: "Studio LUXAFOIR",
    date: "2026-03-12",
    readingMinutes: 4,
  },
  {
    slug: "the-language-of-gold",
    title: "The Language of Gold",
    excerpt: "Why a single restrained accent says more than a wardrobe of colour.",
    category: "Behind the Brand",
    image: img("HOODIE/hoodie-oversized-black-rockstar-art-dist.jpg"),
    author: "Studio LUXAFOIR",
    date: "2026-02-26",
    readingMinutes: 3,
  },
  {
    slug: "distinct-001-lookbook",
    title: "Distinct 001 — The Lookbook",
    excerpt: "The full debut, frame by frame. Where craft meets a global silhouette.",
    category: "Collections",
    image: img("BOXY/boxy-white-sweet-culture.jpg"),
    author: "Studio LUXAFOIR",
    date: "2026-02-10",
    readingMinutes: 6,
  },
  {
    slug: "caring-for-merino",
    title: "Caring for Merino & Cashmere",
    excerpt: "Make the good things last. A primer on caring for fine knitwear.",
    category: "Style Guide",
    image: img("HOODIE/hoodie-oversized-cream-pray-the-lord.jpg"),
    author: "Studio LUXAFOIR",
    date: "2026-01-22",
    readingMinutes: 4,
  },
];

export const JOURNAL_CATEGORIES = [
  "All",
  "Collections",
  "Behind the Brand",
  "Style Guide",
] as const;

export const getArticleBySlug = (slug: string) =>
  JOURNAL_ARTICLES.find((a) => a.slug === slug) ?? null;

export const getFeaturedArticles = (n = 3) => JOURNAL_ARTICLES.slice(0, n);
