"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  label?: string;
  title?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  /** Cap how many to show. */
  limit?: number;
  priorityFirst?: boolean;
  className?: string;
}

/**
 * Section header + responsive 4-up product grid (2-up mobile) with a
 * staggered fade-up entrance. Reused on the homepage and shop pages.
 */
export function ProductGrid({
  products,
  label,
  title,
  viewAllHref,
  viewAllLabel = "home.viewAll",
  limit,
  priorityFirst = false,
  className,
}: ProductGridProps) {
  const { t } = useTranslation();
  const list = limit ? products.slice(0, limit) : products;

  return (
    <section className={cn("mx-auto max-w-site px-site", className)}>
      {(title || label || viewAllHref) && (
        <Reveal className="mb-10 flex items-end justify-between gap-4">
          <div>
            {label && (
              <p className="text-label uppercase tracking-label text-gold">{t(label)}</p>
            )}
            {title && (
              <h2 className="mt-3 font-display text-h2 font-normal text-ivory">{t(title)}</h2>
            )}
          </div>
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="link-underline hidden shrink-0 text-label uppercase tracking-label text-ivory md:inline-block"
            >
              {t(viewAllLabel)}
            </Link>
          )}
        </Reveal>
      )}

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
        {list.map((product, i) => (
          <Reveal key={product.id} delay={(i % 4) * 0.08}>
            <ProductCard product={product} priority={priorityFirst && i < 4} />
          </Reveal>
        ))}
      </div>

      {viewAllHref && (
        <div className="mt-10 flex justify-center md:hidden">
          <Link
            href={viewAllHref}
            className="link-underline text-label uppercase tracking-label text-ivory"
          >
            {viewAllLabel}
          </Link>
        </div>
      )}
    </section>
  );
}
