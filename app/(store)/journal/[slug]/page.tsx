import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageWithBlur } from "@/components/ui/ImageWithBlur";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { JOURNAL_ARTICLES, getArticleBySlug } from "@/lib/journal-data";
import { getFeaturedProducts } from "@/lib/mock-data";

export function generateStaticParams() {
  return JOURNAL_ARTICLES.map((a) => ({ slug: a.slug }));
}

interface Params {
  params: { slug: string };
}

export function generateMetadata({ params }: Params): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: "Journal" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, images: [{ url: article.image }] },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

export default function ArticlePage({ params }: Params) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = JOURNAL_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);
  const products = getFeaturedProducts().slice(0, 4);

  return (
    <article className="pb-10">
      {/* Hero */}
      <header className="relative -mt-[var(--nav-h-mobile)] flex h-[80svh] items-end overflow-hidden bg-obsidian md:-mt-[var(--nav-h)]">
        <ImageWithBlur src={article.image} alt={article.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-site pb-16 text-center">
          <p className="text-label uppercase tracking-label text-gold">{article.category}</p>
          <AnimatedText
            as="h1"
            text={article.title}
            delay={0.1}
            className="mt-4 font-display text-h1 font-light text-white"
          />
          <p className="mt-5 text-caption uppercase tracking-wide text-white/70">
            {article.author} · {formatDate(article.date)} · {article.readingMinutes} min read
          </p>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-2xl px-site py-16 md:py-24">
        <p className="font-display text-2xl font-light leading-relaxed text-ivory">
          {article.excerpt}
        </p>
        <div className="mt-10 flex flex-col gap-6 text-body leading-relaxed text-mist">
          <p>
            At LUXAFOIR, every piece begins not with a sketch but with an intention. We ask what
            a garment must endure — the late nights, the long commutes, the quiet moments — and
            we build for those, not for the runway alone.
          </p>
          <p>
            Our ateliers across Indonesia bring generations of craft to a contemporary
            silhouette. The result is a wardrobe that feels inevitable: considered, restrained,
            and entirely its own.
          </p>
          <blockquote className="border-l border-gold pl-6 font-display text-2xl font-light italic text-ivory">
            &ldquo;Less, but far better. We&apos;d rather make one piece you keep for a decade
            than ten you forget in a season.&rdquo;
          </blockquote>
          <p>
            This is the discipline behind every collection — and the reason the LUXAFOIR label
            means what it does. Crafted for the distinct, always.
          </p>
        </div>
      </div>

      {/* Related products embed */}
      <RelatedProducts products={products} title="Featured in this Story" />

      {/* Related posts */}
      <section className="mx-auto max-w-site px-site py-16">
        <h2 className="mb-8 font-display text-h3 font-normal text-ivory">Keep Reading</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {related.map((a) => (
            <Link key={a.slug} href={`/journal/${a.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                <ImageWithBlur
                  src={a.image}
                  alt={a.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-slow ease-out-expo group-hover:scale-105"
                />
              </div>
              <p className="mt-4 text-label uppercase tracking-label text-gold">{a.category}</p>
              <h3 className="mt-2 font-display text-h3 font-normal text-ivory transition-colors group-hover:text-gold">
                {a.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
