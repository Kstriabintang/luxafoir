"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ImageWithBlur } from "@/components/ui/ImageWithBlur";
import { cn } from "@/lib/utils";
import { JOURNAL_CATEGORIES, type JournalArticle } from "@/lib/journal-data";
import { useTranslation } from "@/components/i18n/LanguageProvider";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

const CAT_KEY: Record<string, string> = {
  All: "journal.all",
  Collections: "journal.collectionsCat",
  "Behind the Brand": "journal.behindBrand",
  "Style Guide": "journal.styleGuide",
};

export function JournalView({ articles }: { articles: JournalArticle[] }) {
  const { t } = useTranslation();
  const [category, setCategory] = useState<(typeof JOURNAL_CATEGORIES)[number]>("All");

  const filtered =
    category === "All" ? articles : articles.filter((a) => a.category === category);

  return (
    <div className="mx-auto max-w-site px-site py-12">
      {/* Header */}
      <header className="mb-12 text-center">
        <p className="text-label uppercase tracking-label text-gold">{t("journal.theJournal")}</p>
        <h1 className="mt-4 font-display text-h1 font-light text-[#0A0A0A]">
          {t("journal.storiesCraft")}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-body text-mist">{t("journal.dispatches")}</p>
      </header>

      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-2 border-y border-ash py-5">
        {JOURNAL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "px-4 py-2 text-label uppercase tracking-label transition-colors",
              category === cat ? "text-gold" : "text-smoke hover:text-ivory"
            )}
          >
            {t(CAT_KEY[cat] ?? cat)}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3"
        >
          {filtered.map((article, i) => (
            <Link
              key={article.slug}
              href={`/journal/${article.slug}`}
              className={cn(
                "group block",
                category === "All" && i === 0 && "md:col-span-3"
              )}
            >
              <div
                className={cn(
                  "relative overflow-hidden bg-charcoal",
                  category === "All" && i === 0 ? "aspect-[16/7]" : "aspect-[4/3]"
                )}
              >
                <ImageWithBlur
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes={category === "All" && i === 0 ? "100vw" : "(max-width: 768px) 100vw, 33vw"}
                  className="object-cover grayscale transition-transform duration-slow ease-out-expo group-hover:scale-105"
                />
              </div>
              <p className="mt-5 text-label uppercase tracking-label text-gold">{t(CAT_KEY[article.category] ?? article.category)}</p>
              <h2
                className={cn(
                  "mt-3 font-display font-normal text-ivory transition-colors group-hover:text-gold",
                  category === "All" && i === 0 ? "text-h2" : "text-h3"
                )}
              >
                {article.title}
              </h2>
              <p className="mt-2 max-w-2xl text-body text-mist">{article.excerpt}</p>
              <p className="mt-4 text-caption text-smoke">
                {formatDate(article.date)} · {article.readingMinutes} {t("journal.minRead")}
              </p>
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="py-24 text-center text-body text-smoke">No stories in this category yet.</p>
      )}
    </div>
  );
}
