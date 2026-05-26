"use client";

import { cn } from "@/lib/utils";
import { SIZE_ORDER } from "@/lib/constants";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import type { ProductVariant } from "@/types/product";

interface SizeSelectorProps {
  variants: ProductVariant[];
  selected: string | null;
  onSelect: (variant: ProductVariant) => void;
  onOpenSizeGuide?: () => void;
  className?: string;
}

function sortVariants(variants: ProductVariant[]) {
  return [...variants].sort((a, b) => {
    const ia = SIZE_ORDER.indexOf(a.size as (typeof SIZE_ORDER)[number]);
    const ib = SIZE_ORDER.indexOf(b.size as (typeof SIZE_ORDER)[number]);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
}

export function SizeSelector({
  variants,
  selected,
  onSelect,
  onOpenSizeGuide,
  className,
}: SizeSelectorProps) {
  const { t } = useTranslation();
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <span className="text-label uppercase tracking-label text-mist">{t("pdp.size")}</span>
        {onOpenSizeGuide && (
          <button
            type="button"
            onClick={onOpenSizeGuide}
            className="text-label uppercase tracking-label text-smoke underline-offset-4 transition-colors hover:text-gold hover:underline"
          >
            {t("shop.sizeGuide")}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {sortVariants(variants).map((variant) => {
          const oos = variant.stock === 0;
          const isSelected = selected === variant.size;
          return (
            <button
              key={variant.id}
              type="button"
              disabled={oos}
              onClick={() => onSelect(variant)}
              aria-pressed={isSelected}
              className={cn(
                "relative flex h-11 min-w-11 items-center justify-center px-3 text-label uppercase tracking-label transition-all duration-fast",
                "border",
                isSelected
                  ? "border-gold bg-gold text-obsidian"
                  : "border-ash text-ivory hover:border-gold",
                oos &&
                  "cursor-not-allowed border-ash/50 text-smoke line-through hover:border-ash/50"
              )}
            >
              {variant.size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
