"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { useCart } from "@/hooks/useCart";
import { useUIStore } from "@/stores/ui.store";

/**
 * Slide-out bag. Auto-opens when an item is added (see useCart.addToCart),
 * animates item add/remove, shows free-shipping progress, and stickies the
 * checkout CTA. This is the conversion centrepiece.
 */
export function CartDrawer() {
  const open = useUIStore((s) => s.cartOpen);
  const close = useUIStore((s) => s.closeCart);
  const { items, summary, updateQuantity, removeItem } = useCart();

  const empty = items.length === 0;

  return (
    <Drawer open={open} onClose={close} side="right" label="Shopping bag">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-ash px-6 py-5">
        <h2 className="text-label uppercase tracking-label text-ivory">
          Your Cart
          {summary.itemCount > 0 && (
            <span className="ml-2 text-smoke">({summary.itemCount})</span>
          )}
        </h2>
        <button
          onClick={close}
          aria-label="Close cart"
          className="-mr-2 p-2 text-ivory transition-colors hover:text-gold"
        >
          <X className="size-5" strokeWidth={1.5} />
        </button>
      </div>

      {empty ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
          <ShoppingBag className="size-10 text-ash" strokeWidth={1} />
          <div>
            <p className="font-display text-2xl text-ivory">Your cart is empty</p>
            <p className="mt-2 text-body text-smoke">
              Pieces you add will appear here.
            </p>
          </div>
          <Button asChild variant="outline" size="md" onClick={close}>
            <Link href="/shop">Shop the Collection</Link>
          </Button>
        </div>
      ) : (
        <>
          {/* Items */}
          <div className="flex-1 divide-y divide-ash overflow-y-auto px-6">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <CartItem
                  key={item.key}
                  item={item}
                  onQuantityChange={updateQuantity}
                  onRemove={removeItem}
                  onNavigate={close}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Sticky footer */}
          <motion.div
            layout
            className="border-t border-ash bg-void px-6 py-6"
          >
            <CartSummary summary={summary} />
            <Button asChild variant="solid" size="full" className="mt-6">
              <Link href="/checkout" onClick={close}>
                Proceed to Checkout
              </Link>
            </Button>
            <button
              onClick={close}
              className="mt-4 w-full text-center text-label uppercase tracking-label text-smoke transition-colors hover:text-ivory"
            >
              Continue Shopping
            </button>
          </motion.div>
        </>
      )}
    </Drawer>
  );
}
