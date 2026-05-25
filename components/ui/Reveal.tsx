"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
}

/**
 * CSS-only scroll reveal. Uses a single IntersectionObserver to add the
 * `reveal-in` class once visible — no per-frame work, no layout thrash.
 * Replaces the previous Framer Motion `whileInView` implementation to keep
 * scrolling buttery smooth. Respects prefers-reduced-motion via globals.css.
 */
export function Reveal({ children, delay = 0, className, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as "div";
  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={cn("reveal", shown && "reveal-in", className)}
    >
      {children}
    </Component>
  );
}

/** Lightweight container — kept for API compatibility. */
export function RevealGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return <div className={cn(className)}>{children}</div>;
}
