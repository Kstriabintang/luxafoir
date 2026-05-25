import type { Metadata } from "next";
import Link from "next/link";
import { ImageWithBlur } from "@/components/ui/ImageWithBlur";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Born from Indonesian craft. LUXAFOIR is a premium fashion house built on quality, sustainability, and considered design.",
};

const VALUES = [
  {
    title: "Quality",
    body: "Premium materials, finished by hand. Each piece is made to outlast the trend that inspired it.",
  },
  {
    title: "Sustainability",
    body: "Responsible sourcing, small-batch production, and a philosophy of less — but far better.",
  },
  {
    title: "Design",
    body: "Editorial minimalism with an Indonesian soul. Restraint as a discipline, not an absence.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-10">
      {/* Hero */}
      <section className="relative -mt-[var(--nav-h-mobile)] flex h-[90svh] items-end overflow-hidden bg-obsidian md:-mt-[var(--nav-h)]">
        <ImageWithBlur
          src="https://images.unsplash.com/photo-1556821840-3a63f15732ce?auto=format&fit=crop&w=1920&h=2400&q=80"
          alt="LUXAFOIR atelier"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-obsidian/30" />
        <div className="relative z-10 mx-auto w-full max-w-site px-site pb-20">
          <p className="text-label uppercase tracking-label text-gold">Our Story</p>
          <AnimatedText
            as="h1"
            text={"Born from\nIndonesian Craft"}
            delay={0.1}
            className="mt-4 font-display text-hero font-light text-white"
          />
        </div>
      </section>

      {/* Brand story */}
      <section className="mx-auto max-w-3xl px-site py-20 md:py-28">
        <Reveal>
          <p className="font-display text-3xl font-light leading-relaxed text-ivory">
            LUXAFOIR began with a question: why should luxury be borrowed from elsewhere?
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col gap-6 text-body leading-relaxed text-mist">
            <p>
              We are a fashion house rooted in Indonesia, building garments that stand beside the
              great international names — not by imitation, but by conviction. Our cutting tables
              sit where generations of craft already live, and we bring that inheritance to a
              contemporary, global silhouette.
            </p>
            <p>
              Every collection is an edit, not an avalanche. We make fewer things, better — pieces
              with the weight and finish to be kept, repaired, and worn for a decade. That is what
              it means to be crafted for the distinct.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section id="sustainability" className="border-y border-ash bg-void">
        <div className="mx-auto max-w-site px-site py-20 md:py-28">
          <Reveal className="mb-14 text-center">
            <p className="text-label uppercase tracking-label text-gold">What We Stand For</p>
            <h2 className="mt-3 font-display text-h2 font-normal text-ivory">Our Values</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-px md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="flex h-full flex-col border border-ash bg-white p-10">
                  <span className="font-mono text-sm text-gold">0{i + 1}</span>
                  <h3 className="mt-6 font-display text-h3 font-normal text-ivory">{v.title}</h3>
                  <p className="mt-4 text-body text-mist">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-site px-site py-24 text-center md:py-32">
        <Reveal>
          <h2 className="font-display text-h1 font-light italic text-ivory">
            Crafted for the Distinct
          </h2>
          <Button asChild variant="solid" size="lg" className="mt-10">
            <Link href="/shop">Explore the Collection</Link>
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
