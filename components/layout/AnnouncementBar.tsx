"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ANNOUNCEMENT_DISMISS_KEY } from "@/lib/constants";
import { useTranslation } from "@/components/i18n/LanguageProvider";

/**
 * Top promo bar. Static centered text on desktop, an auto-scrolling marquee
 * on mobile. Dismissal persists to localStorage so it stays closed.
 */
export function AnnouncementBar() {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const ANNOUNCEMENT_TEXT = t("announce");

  useEffect(() => {
    const dismissed = localStorage.getItem(ANNOUNCEMENT_DISMISS_KEY) === "true";
    setVisible(!dismissed);
  }, []);

  const dismiss = () => {
    localStorage.setItem(ANNOUNCEMENT_DISMISS_KEY, "true");
    setVisible(false);
  };

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "var(--announcement-h)" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-50 overflow-hidden bg-[#0A0A0A] text-white"
        >
          <div className="relative flex h-[var(--announcement-h)] items-center">
            {/* Desktop: centered static */}
            <p className="hidden w-full text-center text-label uppercase tracking-label md:block">
              {ANNOUNCEMENT_TEXT}
            </p>

            {/* Mobile: marquee */}
            <div className="flex w-full overflow-hidden md:hidden">
              <div className="flex shrink-0 animate-marquee whitespace-nowrap">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="mx-6 text-label uppercase tracking-label">
                    {ANNOUNCEMENT_TEXT}
                  </span>
                ))}
              </div>
              <div
                aria-hidden
                className="flex shrink-0 animate-marquee whitespace-nowrap"
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="mx-6 text-label uppercase tracking-label">
                    {ANNOUNCEMENT_TEXT}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={dismiss}
              aria-label="Dismiss announcement"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/70 transition-colors hover:text-white"
            >
              <X className="size-3.5" strokeWidth={2.5} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
