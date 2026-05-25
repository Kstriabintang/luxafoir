"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { cn, formatIDR, discountPercent } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ImageWithBlur } from "@/components/ui/ImageWithBlur";
import { SizeSelector } from "./SizeSelector";
import { QuantitySelector } from "./QuantitySelector";
import { WishlistButton } from "@/components/shared/WishlistButton";
import { useUIStore } from "@/stores/ui.store";
import { useCart } from "@/hooks/useCart";
import { getProductBySlug } from "@/lib/mock-data";
import type { ProductVariant } from "@/types/product";

export function QuickView() {
  const slug = useUIStore((s) => s.quickViewSlug);
  const close = useUIStore((s) => s.closeQuickView);
  const { addToCart } = useCart();

  const product = slug ? getProductBySlug(slug) : null;

  const [variant, setVariant] = useState<ProductVariant | null>(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  // Reset selection whenever the viewed product changes.
  useEffect(() => {
    setVariant(null);
    setQty(1);
    setActiveImg(0);
  }, [slug]);

  const discount = product ? discountPercent(product.price, product.comparePrice) : null;

  const handleAdd = () => {
    if (!product) return;
    if (!variant) {
      toast.error("Please select a size");
      return;
    }
    addToCart({
      productId: product.id,
      variantId: variant.id,
      slug: product.slug,
      name: product.name,
      size: variant.size,
      price: product.price,
      comparePrice: product.comparePrice,
      image: product.images[0],
      maxStock: variant.stock,
      quantity: qty,
    });
    close();
  };

  return (
    <Modal open={!!product} onClose={close} label="Quick view" className="max-w-4xl">
      {product && (
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery */}
          <div className="flex flex-col gap-3 bg-charcoal p-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-charcoal">
              <ImageWithBlur
                src={product.images[activeImg]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActiveImg(i)}
                    className={cn(
                      "relative aspect-square w-16 overflow-hidden border transition-colors",
                      i === activeImg ? "border-gold" : "border-transparent hover:border-ash"
                    )}
                  >
                    <ImageWithBlur src={src} alt="" fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col p-6 md:p-8">
            {product.category && (
              <p className="text-caption uppercase tracking-label text-smoke">
                {product.category.name}
              </p>
            )}
            <h2 className="mt-2 font-display text-3xl font-light text-ivory">
              {product.name}
            </h2>

            <div className="mt-3 flex items-center gap-3">
              <span className={cn("font-mono text-lg", discount ? "text-gold" : "text-ivory")}>
                {formatIDR(product.price)}
              </span>
              {product.comparePrice && (
                <span className="font-mono text-sm text-smoke line-through">
                  {formatIDR(product.comparePrice)}
                </span>
              )}
              {discount && <Badge variant="sale">−{discount}%</Badge>}
            </div>

            <div className="my-6 h-px bg-ash" />

            <SizeSelector
              variants={product.variants}
              selected={variant?.size ?? null}
              onSelect={setVariant}
            />

            <div className="mt-6 flex items-center gap-4">
              <QuantitySelector
                value={qty}
                onChange={setQty}
                max={variant?.stock ?? 99}
              />
              <Button variant="solid" size="md" className="flex-1" onClick={handleAdd}>
                Add to Cart
              </Button>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <WishlistButton productId={product.id} productName={product.name} withLabel />
              <Link
                href={`/product/${product.slug}`}
                onClick={close}
                className="text-label uppercase tracking-label text-smoke underline-offset-4 transition-colors hover:text-gold hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
