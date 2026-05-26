"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { ImageWithBlur } from "@/components/ui/ImageWithBlur";
import { Reveal } from "@/components/ui/Reveal";
import { cn, formatIDR } from "@/lib/utils";
import { useUIStore } from "@/stores/ui.store";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import type { Product } from "@/types/product";

interface Hotspot {
  product: Product;
  /** Percentage position within the image. */
  x: number;
  y: number;
}

interface ShopTheLookProps {
  image?: string;
  products: Product[];
}

const POSITIONS = [
  { x: 32, y: 28 },
  { x: 58, y: 52 },
  { x: 40, y: 74 },
  { x: 68, y: 22 },
];

export function ShopTheLook({ image, products }: ShopTheLookProps) {
  const openQuickView = useUIStore((s) => s.openQuickView);
  const { t } = useTranslation();
  const [active, setActive] = useState<string | null>(null);

  const hotspots: Hotspot[] = products.slice(0, POSITIONS.length).map((product, i) => ({
    product,
    ...POSITIONS[i],
  }));

  return (
    <section className="mx-auto max-w-site px-site py-20 md:py-28">
      <Reveal className="mb-10 text-center">
        <p className="text-label uppercase tracking-label text-gold">{t("home.shopTheLook")}</p>
        <h2 className="mt-3 font-display text-h2 font-normal text-ivory">
          {t("home.styledWithIntent")}
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative mx-auto aspect-[4/5] w-full max-w-3xl overflow-hidden bg-charcoal md:aspect-[16/10]">
          <ImageWithBlur
            src={image ?? "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&h=1000&q=80"}
            alt="Shop the look"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />

          {hotspots.map(({ product, x, y }) => {
            const open = active === product.id;
            return (
              <div
                key={product.id}
                className="absolute"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <button
                  onClick={() => setActive(open ? null : product.id)}
                  aria-label={`Shop ${product.name}`}
                  className={cn(
                    "relative flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-obsidian/40 text-white backdrop-blur-sm transition-all hover:scale-110",
                    open && "bg-gold text-obsidian"
                  )}
                >
                  {!open && (
                    <span className="absolute inset-0 animate-ping rounded-full border border-white/50" />
                  )}
                  {open ? <X className="size-3.5" /> : <Plus className="size-3.5" />}
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 top-6 z-10 w-52 -translate-x-1/2 border border-ash bg-void p-3 shadow-2xl"
                    >
                      <div className="flex gap-3">
                        <div className="relative size-16 shrink-0 overflow-hidden bg-charcoal">
                          <ImageWithBlur
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-label uppercase tracking-label text-ivory">
                            {product.name}
                          </p>
                          <p className="mt-1 font-mono text-xs text-gold">
                            {formatIDR(product.price)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => openQuickView(product.slug)}
                          className="flex-1 bg-gold py-2 text-[10px] uppercase tracking-label text-obsidian transition-colors hover:bg-gold-bright"
                        >
                          {t("product.quickView")}
                        </button>
                        <Link
                          href={`/product/${product.slug}`}
                          className="flex-1 border border-ash py-2 text-center text-[10px] uppercase tracking-label text-ivory transition-colors hover:border-gold hover:text-gold"
                        >
                          Details
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
