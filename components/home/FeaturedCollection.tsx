import Link from "next/link";
import { ImageWithBlur } from "@/components/ui/ImageWithBlur";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { Collection } from "@/types/product";

interface FeaturedCollectionProps {
  collection: Collection;
  /** Place the image on the right instead of the left. */
  reverse?: boolean;
  eyebrow?: string;
  /** Priority-load the image (above-the-fold features). */
  priority?: boolean;
}

export function FeaturedCollection({
  collection,
  reverse = false,
  eyebrow = "Featured Collection",
  priority = false,
}: FeaturedCollectionProps) {
  return (
    <section className="mx-auto grid max-w-site grid-cols-1 items-stretch gap-px overflow-hidden md:grid-cols-2">
      {/* Image */}
      <div
        className={cn(
          "group relative h-[70vh] overflow-hidden bg-charcoal md:h-[88vh]",
          reverse && "md:order-2"
        )}
      >
        <ImageWithBlur
          src={collection.image ?? "https://images.pexels.com/photos/28758240/pexels-photo-28758240.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=1500"}
          alt={collection.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-cinematic ease-out-expo group-hover:scale-105"
        />
      </div>

      {/* Text */}
      <div
        className={cn(
          "flex items-center bg-void px-site py-16 md:py-0",
          reverse && "md:order-1"
        )}
      >
        <div className="max-w-md">
          <Reveal>
            <p className="text-label uppercase tracking-label text-gold">{eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-h1 font-light italic text-ivory">
              {collection.name}
            </h2>
          </Reveal>
          {collection.description && (
            <Reveal delay={0.16}>
              <p className="mt-6 text-body text-mist">{collection.description}</p>
            </Reveal>
          )}
          <Reveal delay={0.24}>
            <Button asChild variant="outline" size="lg" className="mt-10">
              <Link href={`/collections/${collection.slug}`}>Discover the Collection</Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
