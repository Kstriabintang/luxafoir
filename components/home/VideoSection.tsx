import Link from "next/link";
import { Play } from "lucide-react";
import { ImageWithBlur } from "@/components/ui/ImageWithBlur";
import { Reveal } from "@/components/ui/Reveal";

interface VideoSectionProps {
  /** Optional looping video source; falls back to a still image. */
  videoSrc?: string;
  poster?: string;
  eyebrow?: string;
  headline?: string;
  href?: string;
  ctaLabel?: string;
}

/**
 * Cinematic full-bleed section (kept dark intentionally). Plays a muted
 * looping reel when a source is provided, otherwise an editorial still.
 */
export function VideoSection({
  videoSrc,
  poster = "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1920&h=1080&q=80",
  eyebrow = "The Film",
  headline = "Crafted, frame by frame.",
  href = "/journal",
  ctaLabel = "Watch the Story",
}: VideoSectionProps) {
  return (
    <section className="relative h-[80svh] w-full overflow-hidden bg-obsidian">
      {videoSrc ? (
        <video
          className="absolute inset-0 size-full object-cover"
          src={videoSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <ImageWithBlur src={poster} alt={headline} fill sizes="100vw" className="object-cover" />
      )}

      <div className="absolute inset-0 bg-obsidian/50" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-site text-center">
        <Reveal>
          <p className="text-label uppercase tracking-label text-gold-bright">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-4 max-w-3xl font-display text-h1 font-light italic text-white">
            {headline}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <Link
            href={href}
            className="group mt-10 inline-flex items-center gap-4 text-label uppercase tracking-label text-white"
          >
            <span className="flex size-14 items-center justify-center rounded-full border border-white/60 transition-all duration-300 group-hover:scale-105 group-hover:border-gold group-hover:text-gold">
              <Play className="size-5 translate-x-0.5 fill-current" strokeWidth={1} />
            </span>
            {ctaLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
