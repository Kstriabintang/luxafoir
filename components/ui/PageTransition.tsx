"use client";

import { motion } from "framer-motion";

/**
 * Page enter transition. Rendered inside route-group `template.tsx`, which
 * remounts on each navigation — so this fade-up plays on every page change.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
