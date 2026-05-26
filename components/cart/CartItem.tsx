"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { formatIDR } from "@/lib/utils";
import { ImageWithBlur } from "@/components/ui/ImageWithBlur";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import type { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (key: string, qty: number) => void;
  onRemove: (key: string) => void;
  onNavigate?: () => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function CartItem({ item, onQuantityChange, onRemove, onNavigate }: CartItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="flex gap-4 py-5"
    >
      <Link
        href={`/product/${item.slug}`}
        onClick={onNavigate}
        className="relative size-20 shrink-0 overflow-hidden bg-charcoal"
      >
        <ImageWithBlur src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/product/${item.slug}`}
              onClick={onNavigate}
              className="block truncate text-label uppercase tracking-label text-ivory transition-colors hover:text-gold"
            >
              {item.name}
            </Link>
            <p className="mt-1 text-caption text-smoke">Size {item.size}</p>
          </div>
          <button
            onClick={() => onRemove(item.key)}
            aria-label={`Remove ${item.name}`}
            className="shrink-0 p-1 text-smoke transition-colors hover:text-error"
          >
            <Trash2 className="size-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between pt-3">
          <QuantitySelector
            value={item.quantity}
            max={item.maxStock}
            onChange={(q) => onQuantityChange(item.key, q)}
          />
          <p className="font-mono text-sm text-ivory">
            {formatIDR(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
