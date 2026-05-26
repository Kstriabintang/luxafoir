"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { subscribeEmail } from "@/lib/newsletter";
import { useTranslation } from "@/components/i18n/LanguageProvider";

export function NewsletterSection() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email.");
      return;
    }
    setStatus("loading");
    try {
      await subscribeEmail(email);
      setStatus("success");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="relative overflow-hidden border-t border-ash bg-[#F8F7F5]">
      <div className="relative mx-auto max-w-3xl px-site py-24 text-center md:py-32">
        <Reveal>
          <p className="text-label uppercase tracking-label text-gold">{t("home.theList")}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 font-display text-h1 font-light italic text-ivory">
            {t("home.stayInKnow")}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-md text-body text-mist">
            {t("home.newsletterSub")}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mx-auto mt-10 flex max-w-md flex-col items-center gap-4"
            >
              <span className="flex size-12 items-center justify-center rounded-full border border-success text-success">
                <Check className="size-6" strokeWidth={1.5} />
              </span>
              <p className="text-body text-ivory">{t("home.subscribed")}</p>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="mx-auto mt-10 flex max-w-md flex-col gap-2">
              <div className="flex items-center gap-3 border-b border-ash focus-within:border-gold">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder={t("home.emailPlaceholder")}
                  className="w-full bg-transparent py-3 font-body text-body text-ivory placeholder:text-smoke focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-label="Subscribe"
                  className="shrink-0 p-2 text-gold transition-colors hover:text-gold-bright disabled:opacity-50"
                >
                  <ArrowRight className={cn("size-5", status === "loading" && "animate-pulse")} />
                </button>
              </div>
              {status === "error" && (
                <p className="text-left text-caption text-error">{message}</p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
