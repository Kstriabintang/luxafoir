"use client";

import { useEffect, useRef, useState } from "react";

interface Options extends IntersectionObserverInit {
  /** Stop observing after the first intersection. */
  once?: boolean;
}

/**
 * Observe when an element enters the viewport.
 * Returns a ref to attach and whether it's currently (or has been) in view.
 */
export function useIntersection<T extends HTMLElement = HTMLDivElement>(
  options: Options = {}
) {
  const { once = true, root = null, rootMargin = "0px", threshold = 0.15 } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, root, rootMargin, threshold]);

  return { ref, inView };
}
