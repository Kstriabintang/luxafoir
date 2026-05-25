"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SearchRefine } from "@/components/search/SearchRefine";
import { ProductGrid } from "@/components/home/ProductGrid";
import { Button } from "@/components/ui/Button";
import { searchProducts } from "@/lib/mock-data";

export function SearchResults() {
  const query = (useSearchParams().get("q") ?? "").trim();
  const results = query ? searchProducts(query) : [];

  return (
    <div className="pb-16">
      <div className="mx-auto max-w-site px-site pt-16 md:pt-24">
        <SearchRefine initialQuery={query} />

        {query && (
          <p className="mt-8 text-center text-caption uppercase tracking-wide text-smoke">
            {results.length} {results.length === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {query && results.length === 0 ? (
        <div className="mx-auto flex max-w-site flex-col items-center px-site py-28 text-center">
          <p className="font-display text-3xl text-ivory">No pieces found</p>
          <p className="mt-3 text-body text-smoke">
            We couldn&apos;t find anything for &ldquo;{query}&rdquo;. Try another term.
          </p>
          <Button asChild variant="outline" size="md" className="mt-8">
            <Link href="/shop">Browse All</Link>
          </Button>
        </div>
      ) : query ? (
        <div className="mt-12">
          <ProductGrid products={results} />
        </div>
      ) : (
        <p className="mt-16 text-center text-body text-smoke">
          Start typing to search the collection.
        </p>
      )}
    </div>
  );
}
