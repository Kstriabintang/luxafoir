"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X, Check, ChevronDown } from "lucide-react";
import { cn, formatIDR } from "@/lib/utils";
import { Drawer } from "@/components/ui/Drawer";
import { Slider } from "@/components/ui/Slider";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGridSkeleton } from "@/components/ui/ProductCardSkeleton";
import { SIZE_ORDER } from "@/lib/constants";
import type { Product, SortOption } from "@/types/product";

const PAGE_SIZE = 8;

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "best-selling", label: "Best Selling" },
];

interface ShopViewProps {
  products: Product[];
  initialSort?: SortOption;
  showCategoryFilter?: boolean;
}

function isSoldOut(p: Product) {
  return p.variants.length > 0 && p.variants.every((v) => v.stock === 0);
}

export function ShopView({
  products,
  initialSort = "newest",
  showCategoryFilter = true,
}: ShopViewProps) {
  // ── Derived option sets ─────────────────────────────
  const priceBounds = useMemo(() => {
    const prices = products.map((p) => p.price);
    return [Math.min(...prices, 0), Math.max(...prices, 1)] as [number, number];
  }, [products]);

  const categories = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) => p.category && map.set(p.category.slug, p.category.name));
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
  }, [products]);

  const sizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.variants.forEach((v) => set.add(v.size)));
    return Array.from(set).sort(
      (a, b) =>
        SIZE_ORDER.indexOf(a as (typeof SIZE_ORDER)[number]) -
        SIZE_ORDER.indexOf(b as (typeof SIZE_ORDER)[number])
    );
  }, [products]);

  // ── Filter state ────────────────────────────────────
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>(priceBounds);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>(initialSort);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setPrice(priceBounds), [priceBounds]);

  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const priceTouched = price[0] !== priceBounds[0] || price[1] !== priceBounds[1];
  const activeCount =
    selectedCategories.length + selectedSizes.length + (inStockOnly ? 1 : 0) + (priceTouched ? 1 : 0);

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setPrice(priceBounds);
    setInStockOnly(false);
  };

  // ── Filter + sort pipeline ──────────────────────────
  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      if (selectedCategories.length && !selectedCategories.includes(p.category?.slug ?? ""))
        return false;
      if (selectedSizes.length) {
        const productSizes = p.variants.filter((v) => v.stock > 0).map((v) => v.size);
        if (!selectedSizes.some((s) => productSizes.includes(s))) return false;
      }
      if (p.price < price[0] || p.price > price[1]) return false;
      if (inStockOnly && isSoldOut(p)) return false;
      return true;
    });

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "best-selling":
        result.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
        break;
      default:
        result.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    }
    return result;
  }, [products, selectedCategories, selectedSizes, price, inStockOnly, sort]);

  // Reset pagination whenever the result set changes.
  useEffect(() => setVisibleCount(PAGE_SIZE), [filtered.length, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Infinite scroll.
  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingMore) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((c) => c + PAGE_SIZE);
            setLoadingMore(false);
          }, 500);
        }
      },
      { rootMargin: "400px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasMore, loadingMore]);

  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label;

  return (
    <div>
      {/* ── Sticky toolbar ── */}
      <div className="sticky top-[var(--nav-h-mobile)] z-30 border-y border-ash bg-white/90 backdrop-blur-xl md:top-[var(--nav-h)]">
        <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-site py-4">
          <button
            onClick={() => setFiltersOpen(true)}
            className="inline-flex items-center gap-2 text-label uppercase tracking-label text-ivory transition-colors hover:text-gold"
          >
            <SlidersHorizontal className="size-4" strokeWidth={1.5} />
            Filters
            {activeCount > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-gold font-mono text-[10px] text-obsidian">
                {activeCount}
              </span>
            )}
          </button>

          <p className="hidden text-caption text-smoke sm:block">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen((o) => !o)}
              onBlur={() => setTimeout(() => setSortOpen(false), 150)}
              className="inline-flex items-center gap-2 text-label uppercase tracking-label text-ivory transition-colors hover:text-gold"
            >
              {activeSortLabel}
              <ChevronDown
                className={cn("size-4 transition-transform", sortOpen && "rotate-180")}
                strokeWidth={1.5}
              />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full z-40 mt-2 w-56 border border-ash bg-charcoal py-2 shadow-2xl"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <li key={opt.value}>
                      <button
                        onMouseDown={() => {
                          setSort(opt.value);
                          setSortOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between px-4 py-2.5 text-left text-caption transition-colors hover:bg-void hover:text-gold",
                          sort === opt.value ? "text-gold" : "text-mist"
                        )}
                      >
                        {opt.label}
                        {sort === opt.value && <Check className="size-3.5" />}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Active filter chips */}
        {activeCount > 0 && (
          <div className="mx-auto flex max-w-site flex-wrap items-center gap-2 px-site pb-4">
            {selectedCategories.map((slug) => (
              <FilterChip
                key={slug}
                label={categories.find((c) => c.slug === slug)?.name ?? slug}
                onRemove={() => setSelectedCategories((s) => s.filter((x) => x !== slug))}
              />
            ))}
            {selectedSizes.map((s) => (
              <FilterChip
                key={s}
                label={`Size ${s}`}
                onRemove={() => setSelectedSizes((arr) => arr.filter((x) => x !== s))}
              />
            ))}
            {priceTouched && (
              <FilterChip
                label={`${formatIDR(price[0])} – ${formatIDR(price[1])}`}
                onRemove={() => setPrice(priceBounds)}
              />
            )}
            {inStockOnly && (
              <FilterChip label="In stock" onRemove={() => setInStockOnly(false)} />
            )}
            <button
              onClick={clearAll}
              className="ml-1 text-caption uppercase tracking-wide text-smoke underline-offset-4 transition-colors hover:text-gold hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* ── Grid ── */}
      <div className="mx-auto max-w-site px-site py-12">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <p className="font-display text-3xl text-ivory">No pieces found</p>
            <p className="mt-3 text-body text-smoke">
              Try adjusting your filters to see more.
            </p>
            <Button variant="outline" size="md" className="mt-8" onClick={clearAll}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
              {visible.map((product, i) => (
                <ProductCard key={product.id} product={product} priority={i < 4} />
              ))}
            </div>

            {loadingMore && <div className="mt-10"><ProductGridSkeleton count={4} /></div>}
            <div ref={sentinelRef} className="h-px w-full" aria-hidden />
            {!hasMore && filtered.length > PAGE_SIZE && (
              <p className="mt-16 text-center text-label uppercase tracking-label text-smoke">
                You&apos;ve reached the end
              </p>
            )}
          </>
        )}
      </div>

      {/* ── Filter drawer ── */}
      <Drawer open={filtersOpen} onClose={() => setFiltersOpen(false)} side="left" label="Filters">
        <div className="flex items-center justify-between border-b border-ash px-6 py-5">
          <h2 className="text-label uppercase tracking-label text-ivory">Filters</h2>
          <button
            onClick={() => setFiltersOpen(false)}
            aria-label="Close filters"
            className="-mr-2 p-2 text-ivory transition-colors hover:text-gold"
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {showCategoryFilter && categories.length > 0 && (
            <FilterGroup title="Category">
              {categories.map((c) => (
                <CheckRow
                  key={c.slug}
                  label={c.name}
                  checked={selectedCategories.includes(c.slug)}
                  onChange={() => setSelectedCategories((s) => toggle(s, c.slug))}
                />
              ))}
            </FilterGroup>
          )}

          <FilterGroup title="Size">
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSizes((arr) => toggle(arr, s))}
                  className={cn(
                    "flex h-10 min-w-10 items-center justify-center border px-3 text-label uppercase tracking-label transition-colors",
                    selectedSizes.includes(s)
                      ? "border-gold bg-gold text-obsidian"
                      : "border-ash text-ivory hover:border-gold"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Price">
            <Slider
              value={price}
              min={priceBounds[0]}
              max={priceBounds[1]}
              step={50000}
              minStepsBetweenThumbs={1}
              onValueChange={(v) => setPrice([v[0], v[1]] as [number, number])}
              className="mt-2"
            />
            <div className="mt-4 flex items-center justify-between font-mono text-xs text-mist">
              <span>{formatIDR(price[0])}</span>
              <span>{formatIDR(price[1])}</span>
            </div>
          </FilterGroup>

          <FilterGroup title="Availability">
            <CheckRow
              label="In stock only"
              checked={inStockOnly}
              onChange={() => setInStockOnly((v) => !v)}
            />
          </FilterGroup>
        </div>

        <div className="border-t border-ash bg-void px-6 py-5">
          <div className="flex gap-3">
            <Button variant="dark" size="md" className="flex-1" onClick={clearAll}>
              Clear
            </Button>
            <Button variant="solid" size="md" className="flex-1" onClick={() => setFiltersOpen(false)}>
              Show {filtered.length}
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-2 border border-ash px-3 py-1.5 text-caption text-mist">
      {label}
      <button onClick={onRemove} aria-label={`Remove ${label}`} className="hover:text-gold">
        <X className="size-3" />
      </button>
    </span>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-ash py-6 first:pt-0">
      <h3 className="mb-4 text-label uppercase tracking-label text-gold">{title}</h3>
      {children}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className="flex w-full items-center gap-3 py-2 text-left text-body text-ivory transition-colors hover:text-gold"
    >
      <span
        className={cn(
          "flex size-4 shrink-0 items-center justify-center border transition-colors",
          checked ? "border-gold bg-gold text-obsidian" : "border-ash"
        )}
      >
        {checked && <Check className="size-3" strokeWidth={3} />}
      </span>
      {label}
    </button>
  );
}
