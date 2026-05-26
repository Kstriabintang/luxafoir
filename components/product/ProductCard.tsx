"use client";

import Link from "next/link";
import { cn, formatIDR, discountPercent } from "@/lib/utils";
import { ImageWithBlur } from "@/components/ui/ImageWithBlur";
import { Badge } from "@/components/ui/Badge";
import { WishlistButton } from "@/components/shared/WishlistButton";
import { useUIStore } from "@/stores/ui.store";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  /** Priority-load the image (above-the-fold grids). */
  priority?: boolean;
  className?: string;
}

const NEW_TAG = "new";

/** Keeps every product image cohesive and monochrome regardless of source. */
const IMG_STYLE = {
  objectPosition: "center top",
  filter: "grayscale(10%) contrast(1.08) brightness(0.97)",
} as const;

export function ProductCard({ product, priority, className }: ProductCardProps) {
  const openQuickView = useUIStore((s) => s.openQuickView);
  const { t } = useTranslation();

  const soldOut = product.variants.length > 0 && product.variants.every((v) => v.stock === 0);
  const discount = discountPercent(product.price, product.comparePrice);
  const isNew = product.tags.includes(NEW_TAG);
  const hoverImage = product.images[1];

  return (
    <article
      className={cn(
        "group relative transition-transform duration-300 ease-out-expo hover:-translate-y-1",
        className
      )}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden border border-transparent bg-[#F2EFE9] transition-all duration-300 group-hover:border-[#E5E2DC] group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
          {/* Primary image */}
          <ImageWithBlur
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            style={IMG_STYLE}
            className={cn(
              "object-cover transition-transform duration-500 ease-out-expo",
              hoverImage ? "group-hover:opacity-0" : "group-hover:scale-105"
            )}
          />
          {/* Secondary image revealed on hover */}
          {hoverImage && (
            <ImageWithBlur
              src={hoverImage}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              loading="lazy"
              style={IMG_STYLE}
              className="object-cover opacity-0 transition-all duration-500 ease-out-expo group-hover:scale-105 group-hover:opacity-100"
            />
          )}

          {/* Badges */}
          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
            {discount && !soldOut && <Badge variant="sale">−{discount}%</Badge>}
            {isNew && !soldOut && <Badge variant="new">{t("product.new")}</Badge>}
          </div>

          {/* Wishlist */}
          <div className="absolute right-3 top-3 z-10">
            <WishlistButton productId={product.id} productName={product.name} />
          </div>

          {/* Sold out overlay */}
          {soldOut && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
              <span className="text-label uppercase tracking-widest text-white">
                {t("product.soldOut")}
              </span>
            </div>
          )}

          {/* Quick View — slides up on hover (desktop) */}
          {!soldOut && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                openQuickView(product.slug);
              }}
              className="absolute inset-x-0 bottom-0 z-10 hidden translate-y-full bg-[#0A0A0A] py-3.5 text-label uppercase tracking-label text-white transition-transform duration-300 ease-out-expo group-hover:translate-y-0 md:block"
            >
              {t("product.quickView")}
            </button>
          )}
        </div>
      </Link>

      {/* Meta */}
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link href={`/product/${product.slug}`}>
            <h3 className="truncate text-label uppercase tracking-label text-ivory transition-colors group-hover:text-gold">
              {product.name}
            </h3>
          </Link>
          {product.category && (
            <p className="mt-1 text-caption text-smoke">{product.category.name}</p>
          )}
        </div>

        <div className="shrink-0 text-right">
          <p className={cn("font-mono text-sm", discount ? "text-gold" : "text-ivory")}>
            {formatIDR(product.price)}
          </p>
          {product.comparePrice && (
            <p className="font-mono text-xs text-smoke line-through">
              {formatIDR(product.comparePrice)}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
