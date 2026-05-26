"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { BLUR_DATA_URL } from "@/lib/utils";

type Props = Omit<ImageProps, "placeholder">;

/** Branded fallback shown if an image fails to load (no blank-white tiles). */
const FALLBACK =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='800'><rect width='100%' height='100%' fill='#F2EFE9'/><text x='50%' y='50%' font-family='Georgia, serif' font-size='40' fill='#9b8b5c' text-anchor='middle' dominant-baseline='middle' letter-spacing='6'>LUXAFOIR</text></svg>`
  );

/**
 * next/image wrapper with a blur placeholder, soft fade-in, and an onError
 * fallback so a broken source never renders as a blank white tile.
 */
export function ImageWithBlur({ className, alt, src, ...props }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  // Reset when the source prop changes (e.g. gallery / hover swaps).
  useEffect(() => {
    setImgSrc(src);
    setLoaded(false);
  }, [src]);

  return (
    <Image
      alt={alt}
      src={imgSrc}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      onLoad={() => setLoaded(true)}
      onError={() => setImgSrc(FALLBACK)}
      className={cn(
        "transition-all duration-slow ease-out-expo",
        loaded ? "scale-100 blur-0" : "scale-[1.02] blur-md",
        className
      )}
      {...props}
    />
  );
}
