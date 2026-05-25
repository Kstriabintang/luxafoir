export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="skeleton aspect-[3/4] w-full" />
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="skeleton h-3 w-3/4" />
          <div className="skeleton h-2.5 w-1/3" />
        </div>
        <div className="skeleton h-3 w-16" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
