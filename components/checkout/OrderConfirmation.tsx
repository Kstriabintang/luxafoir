"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/components/i18n/LanguageProvider";

export function OrderConfirmation() {
  const orderId = useSearchParams().get("order_id") ?? "";
  const { t } = useTranslation();
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-site py-32 text-center">
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="flex size-20 items-center justify-center rounded-full border border-gold text-gold"
      >
        <motion.span
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 15 }}
        >
          <Check className="size-9" strokeWidth={1.5} />
        </motion.span>
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
      >
        <h1 className="mt-10 font-display text-h1 font-light text-ivory">{t("confirm.title")}</h1>
        <p className="mt-4 text-body text-mist">{t("confirm.thanks")}</p>
        {orderId && (
          <p className="mt-6 text-label uppercase tracking-label text-gold">
            {t("confirm.order")} {orderId}
          </p>
        )}

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button asChild variant="solid" size="lg">
            <Link href="/shop">{t("confirm.continue")}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/account/orders">{t("confirm.viewOrders")}</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
