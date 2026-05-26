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

const img = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=80&fit=crop`;

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    slug: "the-obsidian-hour",
    title: "The Obsidian Hour",
    excerpt:
      "On darkness as a discipline — how the after-dark palette shaped our debut tailoring.",
    category: "Collections",
    image: img("1558618666-fcd25c85cd64"),
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
    image: img("1558769132-cb1aea458c5e"),
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
    image: img("1539109136881-3be0616acf4b"),
    author: "Studio LUXAFOIR",
    date: "2026-03-12",
    readingMinutes: 4,
  },
  {
    slug: "the-language-of-gold",
    title: "The Language of Gold",
    excerpt: "Why a single restrained accent says more than a wardrobe of colour.",
    category: "Behind the Brand",
    image: img("1535632066927-ab7c9ab60908"),
    author: "Studio LUXAFOIR",
    date: "2026-02-26",
    readingMinutes: 3,
  },
  {
    slug: "distinct-001-lookbook",
    title: "Distinct 001 — The Lookbook",
    excerpt: "The full debut, frame by frame. Where craft meets a global silhouette.",
    category: "Collections",
    image: img("1490481651871-ab68de25d43d"),
    author: "Studio LUXAFOIR",
    date: "2026-02-10",
    readingMinutes: 6,
  },
  {
    slug: "caring-for-merino",
    title: "Caring for Merino & Cashmere",
    excerpt: "Make the good things last. A primer on caring for fine knitwear.",
    category: "Style Guide",
    image: img("1576566588028-4147f3842f27"),
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
