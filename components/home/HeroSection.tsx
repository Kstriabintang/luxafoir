"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithBlur } from "@/components/ui/ImageWithBlur";
import { Button } from "@/components/ui/Button";

interface Slide {
  image: string;
  label: string;
  headline: string;
  subtext: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

const hero = (n: number) => `/mockups/hero-${n}.svg`;

const SLIDES: Slide[] = [
  {
    image: hero(1),
    label: "New Drop — 2026",
    headline: "Hitam.\nSelalu.",
    subtext: "Koleksi dasar kami. Boxy, berat, tidak pernah salah.",
    primary: { label: "Belanja Sekarang", href: "/shop" },
    secondary: { label: "Koleksi Baru", href: "/shop?sort=newest" },
  },
  {
    image: hero(2),
    label: "Heavyweight Series",
    headline: "Bukan\nSembarangan.",
    subtext: "240gsm ke atas. Hoodie 420gsm. Baju yang bertahan lama.",
    primary: { label: "Lihat Hoodie", href: "/shop/hoodie" },
    secondary: { label: "Koleksi Heavyweight", href: "/collections/obsidian-hour" },
  },
  {
    image: hero(3),
    label: "Utility — Skena Pants",
    headline: "Gombrang.\nBebas.",
    subtext: "Celana wide, cargo, jogger. Potongan yang tidak mengekang.",
    primary: { label: "Lihat Celana", href: "/shop/pants" },
    secondary: { label: "Koleksi Utility", href: "/collections/monsoon" },
  },
  {
    image: hero(4),
    label: "Essentials",
    headline: "Dasar\nDari Semua.",
    subtext: "Kaos polos yang tidak polos-polos amat.",
    primary: { label: "Lihat Kaos", href: "/shop/tshirt" },
    secondary: { label: "Koleksi Essentials", href: "/collections/distinct-001" },
  },
  {
    image: hero(5),
    label: "Local Pride",
    headline: "Dari\nIndonesia.",
    subtext: "Brand lokal, kualitas global. Made with conviction.",
    primary: { label: "Belanja Semua", href: "/shop" },
    secondary: { label: "Tentang Kami", href: "/about" },
  },
];

const AUTO_MS = 6000;
const EASE = [0.16, 1, 0.3, 1] as const;

const contentParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};
const contentItem = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function HeroSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % SLIDES.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [index, paused]);

  const slide = SLIDES[index];

  return (
    <section
      className="relative -mt-[var(--nav-h-mobile)] flex h-[100svh] items-center overflow-hidden bg-obsidian md:-mt-[var(--nav-h)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Slides */}
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1 }, scale: { duration: 7, ease: "linear" } }}
          className="absolute inset-0"
        >
          <ImageWithBlur
            src={slide.image}
            alt={slide.label}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-obsidian/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-site px-site">
        <motion.div
          key={`content-${index}`}
          variants={contentParent}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.p
            variants={contentItem}
            className="text-label uppercase tracking-label text-gold"
          >
            {slide.label}
          </motion.p>
          <motion.h1
            variants={contentItem}
            className="mt-5 whitespace-pre-line font-display text-hero font-light text-white"
          >
            {slide.headline}
          </motion.h1>
          <motion.p
            variants={contentItem}
            className="mt-6 max-w-md text-body text-white/80"
          >
            {slide.subtext}
          </motion.p>
          <motion.div variants={contentItem} className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="light" size="lg">
              <Link href={slide.primary.href}>{slide.primary.label}</Link>
            </Button>
            <Button asChild variant="ivory" size="lg">
              <Link href={slide.secondary.href}>{slide.secondary.label}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous slide"
        className="group absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 p-3 text-white/60 opacity-0 transition-all hover:text-white md:block md:group-hover:opacity-100"
      >
        <ChevronLeft className="size-7" strokeWidth={1} />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next slide"
        className="group absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 p-3 text-white/60 opacity-0 transition-all hover:text-white md:block md:group-hover:opacity-100"
      >
        <ChevronRight className="size-7" strokeWidth={1} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="h-1.5 overflow-hidden rounded-full bg-white/30 transition-all"
            style={{ width: i === index ? 36 : 6 }}
          >
            {i === index && (
              <motion.span
                key={`bar-${index}-${paused}`}
                className="block h-full bg-gold"
                initial={{ width: "0%" }}
                animate={{ width: paused ? "0%" : "100%" }}
                transition={{ duration: paused ? 0 : AUTO_MS / 1000, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
