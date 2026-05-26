"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { formatIDR } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ImageWithBlur } from "@/components/ui/ImageWithBlur";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { CartSummary } from "@/components/cart/CartSummary";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const { items, summary, updateQuantity, removeItem, hydrated } = useCart();

  if (hydrated && items.length === 0) {
    return (
      <div className="mx-auto flex max-w-site flex-col items-center justify-center px-site py-40 text-center">
        <ShoppingBag className="size-12 text-ash" strokeWidth={1} />
        <h1 className="mt-8 font-display text-4xl font-light text-ivory">Your cart is empty</h1>
        <p className="mt-3 text-body text-smoke">
          Discover pieces worth keeping.
        </p>
        <Button asChild variant="solid" size="lg" className="mt-10">
          <Link href="/shop">Shop the Collection</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-site px-site pt-16 md:pt-24">
      <h1 className="font-display text-h1 font-light text-ivory">Your Cart</h1>
      <p className="mt-3 text-caption uppercase tracking-wide text-smoke">
        {summary.itemCount} {summary.itemCount === 1 ? "item" : "items"}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-12 pb-24 lg:grid-cols-[1fr_380px]">
        {/* Items */}
        <div className="border-t border-ash">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={item.key}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-5 border-b border-ash py-6"
              >
                <Link
                  href={`/product/${item.slug}`}
                  className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden bg-charcoal md:w-28"
                >
                  <ImageWithBlur src={item.image} alt={item.name} fill sizes="112px" className="object-cover grayscale" />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        className="text-label uppercase tracking-label text-ivory transition-colors hover:text-gold"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1.5 text-caption text-smoke">Size {item.size}</p>
                      <p className="mt-1.5 font-mono text-sm text-mist">{formatIDR(item.price)}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.key)}
                      aria-label={`Remove ${item.name}`}
                      className="p-1 text-smoke transition-colors hover:text-error"
                    >
                      <Trash2 className="size-4" strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="mt-auto flex items-end justify-between pt-4">
                    <QuantitySelector
                      value={item.quantity}
                      max={item.maxStock}
                      onChange={(q) => updateQuantity(item.key, q)}
                    />
                    <p className="font-mono text-base text-ivory">
                      {formatIDR(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <aside className="h-fit lg:sticky lg:top-[calc(var(--nav-h)+24px)]">
          <div className="border border-ash bg-void p-7">
            <h2 className="text-label uppercase tracking-label text-ivory">Order Summary</h2>
            <div className="mt-6">
              <CartSummary summary={summary} />
            </div>
            <Button asChild variant="solid" size="full" className="mt-7">
              <Link href="/checkout">
                Proceed to Checkout <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Link
              href="/shop"
              className="mt-4 block text-center text-label uppercase tracking-label text-smoke transition-colors hover:text-ivory"
            >
              Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
