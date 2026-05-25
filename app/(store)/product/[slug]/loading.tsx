export default function ProductLoading() {
  return (
    <div className="mx-auto grid max-w-site grid-cols-1 gap-10 px-site pt-10 md:grid-cols-[60%_40%] md:gap-12 md:pt-14">
      <div className="flex gap-4 md:flex-row-reverse md:gap-5">
        <div className="skeleton aspect-[3/4] flex-1" />
        <div className="hidden flex-col gap-3 md:flex md:w-20">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton aspect-[3/4] w-full" />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="skeleton h-3 w-32" />
        <div className="skeleton h-9 w-3/4" />
        <div className="skeleton h-5 w-28" />
        <div className="skeleton mt-4 h-px w-full" />
        <div className="skeleton h-3 w-16" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton size-11" />
          ))}
        </div>
        <div className="skeleton mt-4 h-14 w-full" />
        <div className="skeleton h-14 w-full" />
      </div>
    </div>
  );
}
