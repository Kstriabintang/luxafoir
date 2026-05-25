import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import { PRODUCTS, getProductBySlug, getRelatedProducts } from "@/lib/mock-data";
import { formatIDR } from "@/lib/utils";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

interface Params {
  params: { slug: string };
}

export function generateMetadata({ params }: Params): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: `${product.name} — ${formatIDR(product.price)}. ${product.description.slice(0, 140)}`,
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 140),
      images: product.images[0] ? [{ url: product.images[0] }] : undefined,
    },
  };
}

export default function ProductPage({ params }: Params) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const soldOut = product.variants.every((v) => v.stock === 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    brand: { "@type": "Brand", name: "LUXAFOIR" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "IDR",
      availability: soldOut
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
    },
  };

  return (
    <div className="pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto grid max-w-site grid-cols-1 gap-10 px-site pt-10 md:grid-cols-[60%_40%] md:gap-12 md:pt-14">
        <ProductGallery images={product.images} name={product.name} />
        <div className="md:py-2">
          <ProductInfo product={product} />
        </div>
      </div>

      <RelatedProducts products={related} />
      <RecentlyViewed currentId={product.id} />
    </div>
  );
}
