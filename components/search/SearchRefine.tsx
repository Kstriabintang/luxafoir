"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchRefine({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initialQuery);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
      }}
      className="mx-auto flex max-w-xl items-center gap-3 border-b border-ash pb-4 focus-within:border-gold"
    >
      <Search className="size-5 shrink-0 text-gold" strokeWidth={1.5} />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search for pieces..."
        className="w-full bg-transparent font-display text-2xl font-light text-ivory placeholder:text-smoke focus:outline-none"
      />
    </form>
  );
}
