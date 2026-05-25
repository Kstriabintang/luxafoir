import type { Metadata } from "next";
import { PageHeader } from "@/components/shop/PageHeader";
import { ShopView } from "@/components/shop/ShopView";
import { getAllProducts } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Shop All",
  description: "The full LUXAFOIR catalogue. Crafted for the distinct.",
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <div className="pb-10">
      <PageHeader
        eyebrow="All Pieces"
        title="The Collection"
        description="Considered essentials and statement pieces — each built to outlast the trend."
      />
      <div className="mt-12">
        <ShopView products={products} initialSort="newest" />
      </div>
    </div>
  );
}
