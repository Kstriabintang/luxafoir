import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shop/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ImageWithBlur } from "@/components/ui/ImageWithBlur";
import { COLLECTIONS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore the LUXAFOIR collections — each a complete world of its own.",
};

export default function CollectionsPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Curated Worlds"
        title="Collections"
        description="Each collection is a complete idea — a season, a mood, a discipline."
      />

      <div className="mx-auto mt-14 grid max-w-site grid-cols-1 gap-px md:grid-cols-2">
        {COLLECTIONS.map((c, i) => (
          <Reveal key={c.id} delay={(i % 2) * 0.1}>
            <Link href={`/collections/${c.slug}`} className="group relative block">
              <div className="relative aspect-[4/5] overflow-hidden bg-charcoal md:aspect-[3/2]">
                <ImageWithBlur
                  src={c.image ?? ""}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-slow ease-out-expo group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-obsidian/40 transition-colors group-hover:bg-obsidian/55" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <h2 className="font-display text-h2 font-light italic text-white">{c.name}</h2>
                  {c.description && (
                    <p className="mt-3 max-w-sm text-body text-white/80">{c.description}</p>
                  )}
                  <span className="link-underline mt-6 text-label uppercase tracking-label text-gold">
                    Explore
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
