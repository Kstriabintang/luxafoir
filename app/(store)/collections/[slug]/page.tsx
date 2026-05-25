import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImageWithBlur } from "@/components/ui/ImageWithBlur";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { ShopView } from "@/components/shop/ShopView";
import {
  COLLECTIONS,
  getCollectionBySlug,
  getProductsByCollection,
} from "@/lib/mock-data";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

interface Params {
  params: { slug: string };
}

export function generateMetadata({ params }: Params): Metadata {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) return { title: "Collection" };
  return {
    title: collection.name,
    description: collection.description ?? `Shop the ${collection.name} collection.`,
  };
}

export default function CollectionPage({ params }: Params) {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) notFound();

  const products = getProductsByCollection(params.slug);

  return (
    <div className="pb-10">
      {/* Editorial hero */}
      <section className="relative -mt-[var(--nav-h-mobile)] flex h-[70svh] items-end overflow-hidden bg-obsidian md:-mt-[var(--nav-h)]">
        <ImageWithBlur
          src={collection.image ?? ""}
          alt={collection.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-obsidian/20" />
        <div className="relative z-10 mx-auto w-full max-w-site px-site pb-14">
          <p className="text-label uppercase tracking-label text-gold">Collection</p>
          <AnimatedText
            as="h1"
            text={collection.name}
            delay={0.1}
            className="mt-4 font-display text-hero font-light italic text-white"
          />
          {collection.description && (
            <p className="mt-5 max-w-lg text-body text-white/80">{collection.description}</p>
          )}
        </div>
      </section>

      <div className="mt-10">
        <ShopView products={products} showCategoryFilter={false} />
      </div>
    </div>
  );
}
