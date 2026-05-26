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

      <div className="mx-auto mt-14 grid max-w-site grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-px px-site md:px-10 lg:px-16">
        {COLLECTIONS.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.08}>
            <Link href={`/collections/${c.slug}`} className="group relative block h-full">
              <div className="relative aspect-[3/4] h-full overflow-hidden bg-charcoal">
                <ImageWithBlur
                  src={c.image ?? ""}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-slow ease-out-expo group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 transition-opacity group-hover:opacity-90"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.38) 55%, rgba(0,0,0,0.08) 100%)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <h2
                    className="font-display text-h2 italic text-white"
                    style={{ fontWeight: 700, textShadow: "0 2px 16px rgba(0,0,0,0.7)" }}
                  >
                    {c.name}
                  </h2>
                  {c.description && (
                    <p
                      className="mt-3 max-w-sm text-body text-white"
                      style={{ textShadow: "0 1px 10px rgba(0,0,0,0.6)" }}
                    >
                      {c.description}
                    </p>
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
