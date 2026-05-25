"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: "right" | "left";
  children: React.ReactNode;
  className?: string;
  /** Accessible label for the dialog. */
  label?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Slide-out panel anchored to a screen edge, with a blurred backdrop.
 * Locks body scroll and closes on Escape / backdrop click.
 */
export function Drawer({
  open,
  onClose,
  side = "right",
  children,
  className,
  label = "Dialog",
}: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label={label}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-obsidian/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ duration: 0.45, ease: EASE }}
            className={cn(
              "absolute inset-y-0 flex w-full max-w-[420px] flex-col bg-void shadow-2xl",
              side === "right" ? "right-0" : "left-0",
              className
            )}
          >
            {children}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
