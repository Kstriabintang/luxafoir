"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Share2, Truck, Check } from "lucide-react";
import { cn, formatIDR, discountPercent } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import { SizeSelector } from "./SizeSelector";
import { QuantitySelector } from "./QuantitySelector";
import { WishlistButton } from "@/components/shared/WishlistButton";
import { SizeGuideModal } from "@/components/shared/SizeGuideModal";
import { useCart } from "@/hooks/useCart";
import { useTranslation } from "@/components/i18n/LanguageProvider";
import type { Product, ProductVariant } from "@/types/product";

export function ProductInfo({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart, addItem } = useCart();
  const { t } = useTranslation();

  const [variant, setVariant] = useState<ProductVariant | null>(null);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [sizeGuide, setSizeGuide] = useState(false);

  const discount = discountPercent(product.price, product.comparePrice);
  const soldOut = product.variants.every((v) => v.stock === 0);

  const buildLine = (v: ProductVariant) => ({
    productId: product.id,
    variantId: v.id,
    slug: product.slug,
    name: product.name,
    size: v.size,
    price: product.price,
    comparePrice: product.comparePrice,
    image: product.images[0],
    maxStock: v.stock,
    quantity: qty,
  });

  const handleAdd = async () => {
    if (!variant) {
      toast.error("Please select a size");
      return;
    }
    setAdding(true);
    // Simulate the request latency so the loading state is visible.
    await new Promise((r) => setTimeout(r, 450));
    addToCart(buildLine(variant));
    setAdding(false);
  };

  const handleBuyNow = () => {
    if (!variant) {
      toast.error("Please select a size");
      return;
    }
    addItem(buildLine(variant));
    router.push("/checkout");
  };

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    }
  };

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-caption uppercase tracking-wide text-smoke">
        <Link href="/" className="hover:text-gold">Home</Link>
        <span>/</span>
        {product.category && (
          <>
            <Link href={`/shop/${product.category.slug}`} className="hover:text-gold">
              {product.category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-mist">{product.name}</span>
      </nav>

      <h1 className="mt-5 font-display text-4xl font-light text-ivory md:text-[40px]">
        {product.name}
      </h1>

      <div className="mt-4 flex items-center gap-3">
        <span className={cn("font-mono text-xl", discount ? "text-gold" : "text-ivory")}>
          {formatIDR(product.price)}
        </span>
        {product.comparePrice && (
          <span className="font-mono text-base text-smoke line-through">
            {formatIDR(product.comparePrice)}
          </span>
        )}
        {discount && <Badge variant="sale">−{discount}%</Badge>}
      </div>

      <div className="my-7 h-px bg-ash" />

      {soldOut ? (
        <div className="flex flex-col gap-4">
          <p className="text-label uppercase tracking-label text-smoke">{t("product.soldOut")}</p>
          <Button variant="dark" size="full" onClick={() => toast.success("We'll notify you when it's back")}>
            {t("product.notifyMe")}
          </Button>
        </div>
      ) : (
        <>
          <SizeSelector
            variants={product.variants}
            selected={variant?.size ?? null}
            onSelect={setVariant}
            onOpenSizeGuide={() => setSizeGuide(true)}
          />

          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <QuantitySelector value={qty} onChange={setQty} max={variant?.stock ?? 99} />
              <Button
                variant="outline"
                size="full"
                loading={adding}
                onClick={handleAdd}
                className="flex-1"
              >
                {t("product.addToCart")}
              </Button>
            </div>
            <Button variant="solid" size="full" onClick={handleBuyNow}>
              {t("product.buyNow")}
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <WishlistButton productId={product.id} productName={product.name} withLabel />
            <button
              onClick={share}
              className="inline-flex items-center gap-2 text-label uppercase tracking-label text-smoke transition-colors hover:text-gold"
            >
              <Share2 className="size-4" strokeWidth={1.5} />
              {t("pdp.share")}
            </button>
          </div>
        </>
      )}

      {/* Free shipping note */}
      <div className="mt-7 flex items-center gap-3 border border-ash px-4 py-3 text-caption text-mist">
        <Truck className="size-4 shrink-0 text-gold" strokeWidth={1.5} />
        {t("pdp.freeShipping")}
      </div>

      {/* Accordions */}
      <Accordion type="single" collapsible defaultValue="description" className="mt-8">
        <AccordionItem value="description">
          <AccordionTrigger>{t("pdp.description")}</AccordionTrigger>
          <AccordionContent>{product.description}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="material">
          <AccordionTrigger>{t("pdp.material")}</AccordionTrigger>
          <AccordionContent>
            {product.material ??
              "Bahan premium, dipilih dengan teliti. Komposisi tiap potong bisa beda — cek label jahit untuk detail lengkapnya."}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="care">
          <AccordionTrigger>{t("pdp.care")}</AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-2">
              {[
                "Cuci dengan air dingin, balik dalam (terutama yang sablon)",
                "Jangan pakai pemutih",
                "Jemur di tempat teduh, jangan langsung kena matahari",
                "Setrika suhu sedang, hindari area sablon",
              ].map((line) => (
                <li key={line} className="flex items-center gap-2">
                  <Check className="size-3.5 shrink-0 text-gold" /> {line}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="shipping">
          <AccordionTrigger>{t("pdp.shipping")}</AccordionTrigger>
          <AccordionContent>
            Dikirim dalam 1–2 hari kerja ke seluruh Indonesia. Retur gratis dalam 14 hari untuk
            barang yang belum dipakai dan label masih utuh.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <SizeGuideModal
        open={sizeGuide}
        onClose={() => setSizeGuide(false)}
        category={product.category?.name}
      />
    </div>
  );
}
