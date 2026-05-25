"use client";

import { useCallback, useEffect, useState } from "react";
import { RECENTLY_VIEWED_KEY } from "@/lib/constants";

const MAX = 8;

/**
 * Tracks recently viewed product IDs in localStorage. Call `record` on a
 * product page; read `ids` to render a "Recently Viewed" rail.
 */
export function useRecentlyViewed() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      setIds(JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) ?? "[]"));
    } catch {
      setIds([]);
    }
  }, []);

  const record = useCallback((productId: string) => {
    setIds((prev) => {
      const next = [productId, ...prev.filter((id) => id !== productId)].slice(0, MAX);
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { ids, record };
}
