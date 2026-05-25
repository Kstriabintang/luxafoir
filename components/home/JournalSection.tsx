"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ImageWithBlur } from "@/components/ui/ImageWithBlur";
import { JOURNAL_ARTICLES } from "@/lib/journal-data";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

export function JournalSection() {
  const articles = JOURNAL_ARTICLES.slice(0, 3);

  return (
    <section className="mx-auto max-w-site px-site py-20 md:py-28">
      <Reveal className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-label uppercase tracking-label text-gold">The Journal</p>
          <h2 className="mt-3 font-display text-h2 font-normal text-ivory">
            Stories & Craft
          </h2>
        </div>
        <Link
          href="/journal"
          className="link-underline hidden shrink-0 text-label uppercase tracking-label text-ivory md:inline-block"
        >
          All Stories
        </Link>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {articles.map((article, i) => (
          <Reveal key={article.slug} delay={i * 0.1}>
            <Link href={`/journal/${article.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                <ImageWithBlur
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-slow ease-out-expo group-hover:scale-105"
                />
              </div>
              <p className="mt-5 text-label uppercase tracking-label text-gold">
                {article.category}
              </p>
              <h3 className="mt-3 font-display text-h3 font-normal text-ivory transition-colors group-hover:text-gold">
                {article.title}
              </h3>
              <p className="mt-2 text-body text-mist">{article.excerpt}</p>
              <p className="mt-4 text-caption text-smoke">
                {formatDate(article.date)} · {article.readingMinutes} min read
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
