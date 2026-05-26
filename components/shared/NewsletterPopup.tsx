"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { ImageWithBlur } from "@/components/ui/ImageWithBlur";
import { NEWSLETTER_COOKIE_KEY } from "@/lib/constants";
import { subscribeEmail } from "@/lib/newsletter";

const SHOW_AFTER_MS = 15_000;
const COOKIE_DAYS = 30;

function alreadySeen() {
  if (typeof document === "undefined") return true;
  return document.cookie.includes(`${NEWSLETTER_COOKIE_KEY}=1`);
}
function markSeen() {
  const d = new Date();
  d.setTime(d.getTime() + COOKIE_DAYS * 864e5);
  document.cookie = `${NEWSLETTER_COOKIE_KEY}=1; expires=${d.toUTCString()}; path=/`;
}

/**
 * Newsletter capture modal. Opens after a 15s dwell OR on exit-intent
 * (cursor leaving the top of the viewport), whichever comes first. Suppressed
 * for 30 days via cookie once seen, subscribed, or dismissed.
 */
export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (alreadySeen()) return;

    let fired = false;
    const trigger = () => {
      if (fired) return;
      fired = true;
      setOpen(true);
      cleanup();
    };

    const timer = setTimeout(trigger, SHOW_AFTER_MS);
    const onExit = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    const cleanup = () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onExit);
    };

    document.addEventListener("mouseleave", onExit);
    return cleanup;
  }, []);

  const close = () => {
    markSeen();
    setOpen(false);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      await subscribeEmail(email);
      setStatus("success");
      markSeen();
      setTimeout(() => setOpen(false), 2200);
    } catch {
      setStatus("error");
    }
  };

  if (typeof document === "undefined") return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[85] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-obsidian/80 backdrop-blur-md" onClick={close} />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="relative grid w-full max-w-3xl grid-cols-1 overflow-hidden bg-void md:grid-cols-2"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 p-2 text-ivory transition-colors hover:text-gold"
            >
              <X className="size-5" strokeWidth={1.5} />
            </button>

            {/* Editorial image */}
            <div className="relative hidden aspect-[3/4] bg-charcoal md:block">
              <ImageWithBlur
                src="/products/BOXY/boxy-white-sweet-culture.jpg"
                alt="LUXAFOIR"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>

            {/* Form */}
            <div className="flex flex-col justify-center p-8 md:p-10">
              {status === "success" ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <span className="flex size-12 items-center justify-center rounded-full border border-success text-success">
                    <Check className="size-6" strokeWidth={1.5} />
                  </span>
                  <p className="font-display text-2xl text-ivory">Welcome to LUXAFOIR</p>
                  <p className="text-body text-mist">Check your inbox for what&apos;s next.</p>
                </div>
              ) : (
                <>
                  <p className="text-label uppercase tracking-label text-gold">The List</p>
                  <h2 className="mt-3 font-display text-3xl font-light italic text-ivory">
                    15% off your first order
                  </h2>
                  <p className="mt-3 text-body text-mist">
                    Join the list for early access to collections, private sales, and the
                    stories behind the craft.
                  </p>
                  <form onSubmit={submit} className="mt-7 flex flex-col gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder="Email address"
                      className="w-full border border-ash bg-transparent px-4 py-3 font-body text-body text-ivory placeholder:text-smoke focus:border-gold focus:outline-none"
                    />
                    {status === "error" && (
                      <span className="text-caption text-error">Please enter a valid email.</span>
                    )}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="bg-gold py-3.5 text-label uppercase tracking-label text-obsidian transition-colors hover:bg-gold-bright disabled:opacity-60"
                    >
                      {status === "loading" ? "Joining…" : "Join"}
                    </button>
                  </form>
                  <button
                    onClick={close}
                    className="mt-4 text-caption text-smoke underline-offset-4 transition-colors hover:text-ivory hover:underline"
                  >
                    No thanks
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
