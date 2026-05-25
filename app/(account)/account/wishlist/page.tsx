"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { useWishlist } from "@/hooks/useWishlist";
import { getProductById } from "@/lib/mock-data";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const products = ids
    .map(getProductById)
    .filter((p): p is NonNullable<typeof p> => p !== null);

  return (
    <div>
      <h2 className="font-display text-3xl font-light text-ivory">Wishlist</h2>
      <p className="mt-2 text-body text-mist">Pieces you&apos;ve saved for later.</p>

      {products.length === 0 ? (
        <div className="mt-10 flex flex-col items-center border border-ash bg-void px-6 py-20 text-center">
          <Heart className="size-10 text-ash" strokeWidth={1} />
          <p className="mt-6 font-display text-2xl text-ivory">Your wishlist is empty</p>
          <p className="mt-2 text-body text-smoke">Tap the heart on any piece to save it here.</p>
          <Button asChild variant="outline" size="md" className="mt-8">
            <Link href="/shop">Discover Pieces</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3 lg:gap-x-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
