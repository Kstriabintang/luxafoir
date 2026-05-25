import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shop/PageHeader";
import { ShopView } from "@/components/shop/ShopView";
import {
  CATEGORIES,
  getCategoryBySlug,
  getProductsByCategory,
  getSaleProducts,
} from "@/lib/mock-data";

export function generateStaticParams() {
  return [{ category: "sale" }, ...CATEGORIES.map((c) => ({ category: c.slug }))];
}

interface Params {
  params: { category: string };
}

export function generateMetadata({ params }: Params): Metadata {
  if (params.category === "sale") {
    return { title: "Sale", description: "Limited-time pricing on select LUXAFOIR pieces." };
  }
  const category = getCategoryBySlug(params.category);
  return {
    title: category ? category.name : "Shop",
    description: category ? `Shop ${category.name} at LUXAFOIR.` : undefined,
  };
}

export default function CategoryPage({ params }: Params) {
  // The "sale" pseudo-category aggregates all discounted products.
  if (params.category === "sale") {
    const products = getSaleProducts();
    return (
      <div className="pb-10">
        <PageHeader
          eyebrow="Limited Time"
          title="Sale"
          description="Select pieces at considered pricing. When they're gone, they're gone."
        />
        <div className="mt-12">
          <ShopView products={products} initialSort="price-asc" />
        </div>
      </div>
    );
  }

  const category = getCategoryBySlug(params.category);
  if (!category) notFound();

  const products = getProductsByCategory(params.category);

  return (
    <div className="pb-10">
      <PageHeader eyebrow="Category" title={category.name} />
      <div className="mt-12">
        <ShopView products={products} showCategoryFilter={false} />
      </div>
    </div>
  );
}
