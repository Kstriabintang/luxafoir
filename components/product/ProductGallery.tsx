"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { ImageWithBlur } from "@/components/ui/ImageWithBlur";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const mainRef = useRef<HTMLDivElement>(null);

  const go = (dir: 1 | -1) =>
    setActive((i) => (i + dir + images.length) % images.length);

  const onMove = (e: React.MouseEvent) => {
    const el = mainRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row-reverse md:gap-5">
      {/* Main image */}
      <div className="flex-1">
        <div
          ref={mainRef}
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          onMouseMove={onMove}
          onClick={() => setLightbox(true)}
          className="group relative aspect-[3/4] cursor-zoom-in overflow-hidden bg-charcoal"
        >
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{ transform: zoom ? "scale(1.6)" : "scale(1)", transformOrigin: origin }}
          >
            <ImageWithBlur
              key={images[active]}
              src={images[active]}
              alt={`${name} — view ${active + 1}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover grayscale"
            />
          </div>
          <span className="absolute right-4 top-4 flex size-9 items-center justify-center bg-obsidian/50 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            <Expand className="size-4" strokeWidth={1.5} />
          </span>

          {/* Mobile pagination dots */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 md:hidden">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "size-1.5 rounded-full transition-colors",
                    i === active ? "bg-gold" : "bg-white/60"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto md:w-20 md:flex-col md:overflow-visible">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative aspect-[3/4] w-16 shrink-0 overflow-hidden border transition-colors md:w-full",
                i === active ? "border-gold" : "border-transparent hover:border-ash"
              )}
            >
              <ImageWithBlur src={src} alt="" fill sizes="80px" className="object-cover grayscale" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {lightbox && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[95] flex items-center justify-center bg-obsidian/95 backdrop-blur-md"
                onClick={() => setLightbox(false)}
              >
                <button
                  onClick={() => setLightbox(false)}
                  aria-label="Close"
                  className="absolute right-5 top-5 z-10 p-2 text-white transition-colors hover:text-gold"
                >
                  <X className="size-6" strokeWidth={1.5} />
                </button>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        go(-1);
                      }}
                      aria-label="Previous"
                      className="absolute left-4 z-10 p-3 text-white/70 transition-colors hover:text-white"
                    >
                      <ChevronLeft className="size-8" strokeWidth={1} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        go(1);
                      }}
                      aria-label="Next"
                      className="absolute right-4 z-10 p-3 text-white/70 transition-colors hover:text-white"
                    >
                      <ChevronRight className="size-8" strokeWidth={1} />
                    </button>
                  </>
                )}

                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-[85vh] w-[90vw] max-w-3xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ImageWithBlur
                    src={images[active]}
                    alt={`${name} — view ${active + 1}`}
                    fill
                    sizes="90vw"
                    className="object-contain grayscale"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
