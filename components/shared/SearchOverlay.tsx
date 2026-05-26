"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, Clock } from "lucide-react";
import { formatIDR } from "@/lib/utils";
import { ImageWithBlur } from "@/components/ui/ImageWithBlur";
import { useUIStore } from "@/stores/ui.store";
import { searchProducts } from "@/lib/mock-data";
import { RECENT_SEARCHES_KEY } from "@/lib/constants";

const MAX_RESULTS = 6;
const EASE = [0.16, 1, 0.3, 1] as const;

export function SearchOverlay() {
  const open = useUIStore((s) => s.searchOpen);
  const close = useUIStore((s) => s.closeSearch);
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches once.
  useEffect(() => {
    try {
      setRecent(JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) ?? "[]"));
    } catch {
      setRecent([]);
    }
  }, []);

  // Focus + reset + scroll-lock + Escape on open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    setQuery("");
    setDebounced("");
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  // Debounce the query (300ms).
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  const results = useMemo(
    () => (debounced.trim() ? searchProducts(debounced).slice(0, MAX_RESULTS) : []),
    [debounced]
  );

  const persistRecent = (term: string) => {
    const t = term.trim();
    if (!t) return;
    const next = [t, ...recent.filter((r) => r !== t)].slice(0, 5);
    setRecent(next);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
  };

  const submit = (term: string) => {
    if (!term.trim()) return;
    persistRecent(term);
    close();
    router.push(`/search?q=${encodeURIComponent(term.trim())}`);
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] overflow-y-auto bg-white/98"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div className="mx-auto max-w-3xl px-site pt-24 pb-16">
            <div className="flex justify-end">
              <button
                onClick={close}
                aria-label="Close search"
                className="p-2 text-ivory transition-colors hover:text-gold"
              >
                <X className="size-6" strokeWidth={1.5} />
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit(query);
                }}
                className="flex items-center gap-4 border-b border-ash pb-4"
              >
                <Search className="size-6 shrink-0 text-gold" strokeWidth={1.5} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for pieces..."
                  className="w-full bg-transparent font-display text-3xl font-light text-ivory placeholder:text-smoke focus:outline-none md:text-4xl"
                />
              </form>

              {/* Recent searches */}
              {!debounced && recent.length > 0 && (
                <div className="mt-8">
                  <p className="text-label uppercase tracking-label text-smoke">Recent</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {recent.map((r) => (
                      <button
                        key={r}
                        onClick={() => submit(r)}
                        className="inline-flex items-center gap-2 border border-ash px-3 py-2 text-caption text-mist transition-colors hover:border-gold hover:text-gold"
                      >
                        <Clock className="size-3" strokeWidth={1.5} />
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results */}
              {debounced && (
                <div className="mt-8">
                  {results.length === 0 ? (
                    <p className="text-body text-smoke">
                      No pieces found for &ldquo;{debounced}&rdquo;.
                    </p>
                  ) : (
                    <>
                      <ul className="divide-y divide-ash">
                        {results.map((p) => (
                          <li key={p.id}>
                            <Link
                              href={`/product/${p.slug}`}
                              onClick={() => {
                                persistRecent(debounced);
                                close();
                              }}
                              className="group flex items-center gap-4 py-4"
                            >
                              <div className="relative size-16 shrink-0 overflow-hidden bg-charcoal">
                                <ImageWithBlur
                                  src={p.images[0]}
                                  alt={p.name}
                                  fill
                                  sizes="64px"
                                  className="object-cover grayscale"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-label uppercase tracking-label text-ivory transition-colors group-hover:text-gold">
                                  {p.name}
                                </p>
                                <p className="mt-1 text-caption text-smoke">
                                  {p.category?.name}
                                </p>
                              </div>
                              <span className="font-mono text-sm text-ivory">
                                {formatIDR(p.price)}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => submit(debounced)}
                        className="mt-6 w-full border border-gold py-3.5 text-label uppercase tracking-label text-gold transition-colors hover:bg-gold hover:text-obsidian"
                      >
                        View all results
                      </button>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
