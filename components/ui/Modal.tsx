"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  label?: string;
  /** Hide the default close button (e.g. full-bleed editorial modals). */
  hideClose?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Centered modal with a scale + fade entrance. Locks scroll,
 * closes on Escape / backdrop click.
 */
export function Modal({
  open,
  onClose,
  children,
  className,
  label = "Dialog",
  hideClose = false,
}: ModalProps) {
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
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={label}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-obsidian/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.4, ease: EASE }}
            className={cn(
              "relative z-10 max-h-[90vh] w-full max-w-3xl overflow-auto bg-void",
              className
            )}
          >
            {!hideClose && (
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 z-20 p-2 text-ivory transition-colors hover:text-gold"
              >
                <X className="size-5" strokeWidth={1.5} />
              </button>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
