"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BLUR_DATA_URL } from "@/lib/utils";

type Props = Omit<ImageProps, "placeholder">;

/**
 * next/image wrapper with a charcoal blur placeholder and a soft fade-in
 * once the asset loads — used everywhere product imagery appears.
 */
export function ImageWithBlur({ className, alt, ...props }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      alt={alt}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      onLoad={() => setLoaded(true)}
      className={cn(
        "transition-all duration-slow ease-out-expo",
        loaded ? "scale-100 blur-0" : "scale-[1.02] blur-md",
        className
      )}
      {...props}
    />
  );
}
