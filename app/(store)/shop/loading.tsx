import { ProductGridSkeleton } from "@/components/ui/ProductCardSkeleton";

export default function ShopLoading() {
  return (
    <div className="mx-auto max-w-site px-site pt-16 md:pt-24">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
        <div className="skeleton h-3 w-24" />
        <div className="skeleton h-10 w-64" />
        <div className="skeleton h-3 w-80" />
      </div>
      <div className="mt-16">
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}
