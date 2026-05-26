"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { useUIStore } from "@/stores/ui.store";
import { useTranslation } from "@/components/i18n/LanguageProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function MobileMenu() {
  const pathname = usePathname();
  const open = useUIStore((s) => s.mobileMenuOpen);
  const close = useUIStore((s) => s.closeMobileMenu);
  const { t } = useTranslation();

  // Close on route change.
  useEffect(() => {
    close();
  }, [pathname, close]);

  // Lock body scroll while open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="fixed inset-0 z-[60] flex flex-col bg-white px-site pb-10 pt-6 md:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl italic text-ivory">LUXAFOIR</span>
            <button
              onClick={close}
              aria-label="Close menu"
              className="-mr-2 p-2 text-ivory transition-colors hover:text-gold"
            >
              <X className="size-6" strokeWidth={1.5} />
            </button>
          </div>

          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="mt-16 flex flex-col gap-2"
          >
            {NAV_LINKS.map((link) => (
              <motion.li key={link.href} variants={itemVariants}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="block font-display text-5xl font-light text-ivory transition-colors hover:text-gold"
                >
                  {t(link.tKey)}
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="show"
            className="mt-auto flex flex-col gap-4"
          >
            <Link
              href="/account"
              onClick={close}
              className="text-label uppercase tracking-label text-mist hover:text-gold"
            >
              Account
            </Link>
            <div className="flex gap-6">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-label uppercase tracking-label text-smoke transition-colors hover:text-gold"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
