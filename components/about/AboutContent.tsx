"use client";

import Link from "next/link";
import { ImageWithBlur } from "@/components/ui/ImageWithBlur";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/components/i18n/LanguageProvider";

const VALUES = [
  { title: "about.val1", body: "about.val1Body" },
  { title: "about.val2", body: "about.val2Body" },
  { title: "about.val3", body: "about.val3Body" },
];

export function AboutContent() {
  const { t } = useTranslation();
  return (
    <div className="pb-10">
      {/* Hero */}
      <section className="relative -mt-[var(--nav-h-mobile)] flex h-[90svh] items-end overflow-hidden bg-obsidian md:-mt-[var(--nav-h)]">
        <ImageWithBlur
          src="/products/HOODIE/hoodie-oversized-black-story-of-human.jpg"
          alt="LUXAFOIR editorial"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto w-full max-w-site px-site pb-20">
          <p className="text-label uppercase tracking-label text-gold">{t("about.ourStory")}</p>
          <AnimatedText
            as="h1"
            text={t("about.bornFrom")}
            delay={0.1}
            className="mt-4 font-display text-hero font-light text-white"
          />
        </div>
      </section>

      {/* Brand story */}
      <section className="mx-auto max-w-3xl px-site py-20 md:py-28">
        <Reveal>
          <p className="font-display text-3xl font-light leading-relaxed text-[#0A0A0A]">
            {t("about.intro")}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col gap-6 text-body leading-relaxed text-mist">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section id="sustainability" className="border-y border-ash bg-[#F8F7F5]">
        <div className="mx-auto max-w-site px-site py-20 md:py-28">
          <Reveal className="mb-14 text-center">
            <p className="text-label uppercase tracking-label text-gold">{t("about.whatWeStandFor")}</p>
            <h2 className="mt-3 font-display text-h2 font-normal text-[#0A0A0A]">{t("about.ourValues")}</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-px md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="flex h-full flex-col border border-ash bg-white p-10">
                  <span className="font-mono text-sm text-gold">0{i + 1}</span>
                  <h3 className="mt-6 font-display text-h3 font-normal text-[#0A0A0A]">{t(v.title)}</h3>
                  <p className="mt-4 text-body text-mist">{t(v.body)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-site px-site py-24 text-center md:py-32">
        <Reveal>
          <h2 className="font-display text-h1 font-light italic text-[#0A0A0A]">
            {t("about.ctaTitle")}
          </h2>
          <Button asChild variant="solid" size="lg" className="mt-10">
            <Link href="/shop">{t("about.ctaBtn")}</Link>
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
