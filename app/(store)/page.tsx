import { HeroSection } from "@/components/home/HeroSection";
import { ProductGrid } from "@/components/home/ProductGrid";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { ShopTheLook } from "@/components/home/ShopTheLook";
import { VideoSection } from "@/components/home/VideoSection";
import { JournalSection } from "@/components/home/JournalSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import {
  getFeaturedProducts,
  getAllProducts,
  getCollectionBySlug,
} from "@/lib/mock-data";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const newArrivals = getAllProducts()
    .slice()
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  const obsidian = getCollectionBySlug("obsidian-hour");
  const monsoon = getCollectionBySlug("monsoon");

  return (
    <>
      <HeroSection />

      <ProductGrid
        className="py-20 md:py-28"
        label="home.featured"
        title="home.featuredTitle"
        viewAllHref="/shop"
        products={featured}
        limit={4}
        priorityFirst
      />

      {obsidian && <FeaturedCollection collection={obsidian} priority />}

      <ProductGrid
        className="py-20 md:py-28"
        label="home.justIn"
        title="home.newArrivals"
        viewAllHref="/shop?sort=newest"
        products={newArrivals}
        limit={8}
      />

      <ShopTheLook products={featured} />

      {monsoon && <FeaturedCollection collection={monsoon} reverse eyebrow="The Collection" />}

      <VideoSection />

      <JournalSection />

      <NewsletterSection />
    </>
  );
}
