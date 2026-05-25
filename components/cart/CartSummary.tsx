"use client";

import { motion } from "framer-motion";
import { cn, formatIDR } from "@/lib/utils";
import type { CartSummary as CartSummaryType } from "@/types/cart";

interface CartSummaryProps {
  summary: CartSummaryType;
  className?: string;
  /** Show the free-shipping progress bar. */
  showProgress?: boolean;
}

/**
 * Subtotal + free-shipping progress. Reused in the cart drawer footer
 * and the full cart page.
 */
export function CartSummary({ summary, className, showProgress = true }: CartSummaryProps) {
  const { subtotal, qualifiesForFreeShipping, remainingForFreeShipping, freeShippingThreshold } =
    summary;
  const pct = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {showProgress && (
        <div className="flex flex-col gap-2">
          <p className="text-caption text-mist">
            {qualifiesForFreeShipping ? (
              <span className="text-success">You&apos;ve unlocked free shipping.</span>
            ) : (
              <>
                Add{" "}
                <span className="text-gold">{formatIDR(remainingForFreeShipping)}</span> more
                for free shipping.
              </>
            )}
          </p>
          <div className="h-px w-full bg-ash">
            <motion.div
              className="h-px bg-gold"
              initial={false}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-label uppercase tracking-label text-mist">Subtotal</span>
        <span className="font-mono text-base text-ivory">{formatIDR(subtotal)}</span>
      </div>
    </div>
  );
}
