"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

export function RelatedProducts({ products, title = "You Might Also Like" }: RelatedProductsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", dragFree: true });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-site px-site py-20">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="font-display text-h3 font-normal text-ivory">{title}</h2>
        <div className="hidden gap-2 md:flex">
          <CarouselButton dir="prev" disabled={!canPrev} onClick={() => emblaApi?.scrollPrev()} />
          <CarouselButton dir="next" disabled={!canNext} onClick={() => emblaApi?.scrollNext()} />
        </div>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4 md:gap-6">
          {products.map((p) => (
            <div key={p.id} className="min-w-0 shrink-0 basis-1/2 md:basis-1/4">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  dir,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className={cn(
        "flex size-10 items-center justify-center border border-ash text-ivory transition-colors hover:border-gold hover:text-gold",
        disabled && "opacity-30 hover:border-ash hover:text-ivory"
      )}
    >
      <Icon className="size-5" strokeWidth={1.5} />
    </button>
  );
}
