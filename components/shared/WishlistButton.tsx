"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/hooks/useWishlist";

interface WishlistButtonProps {
  productId: string;
  productName?: string;
  className?: string;
  /** Show a text label beside the icon (used on the product page). */
  withLabel?: boolean;
  size?: number;
}

/**
 * Heart toggle with a satisfying pop animation. Reads/writes the persisted
 * wishlist store and fires a toast on change.
 */
export function WishlistButton({
  productId,
  productName,
  className,
  withLabel = false,
  size = 18,
}: WishlistButtonProps) {
  const { has, toggle } = useWishlist();
  const active = has(productId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId, productName);
      }}
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        "group/wish inline-flex items-center gap-2 text-ivory transition-colors hover:text-gold",
        className
      )}
    >
      <motion.span
        key={active ? "on" : "off"}
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        className="inline-flex"
      >
        <Heart
          width={size}
          height={size}
          strokeWidth={1.5}
          className={cn(
            "transition-colors",
            active ? "fill-gold text-gold" : "fill-transparent"
          )}
        />
      </motion.span>
      {withLabel && (
        <span className="text-label uppercase tracking-label">
          {active ? "Saved" : "Add to Wishlist"}
        </span>
      )}
    </button>
  );
}
