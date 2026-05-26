"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, Pencil } from "lucide-react";
import { cn, formatIDR } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ImageWithBlur } from "@/components/ui/ImageWithBlur";
import { useCart } from "@/hooks/useCart";
import { shippingSchema, PROVINCES, PROMO_CODES, type ShippingFormValues } from "@/lib/validations";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { PakasirPayment } from "./PakasirPayment";
import { useTranslation } from "@/components/i18n/LanguageProvider";

const STEPS = ["checkout.shipping", "checkout.review", "checkout.payment"] as const;
const JAVA = ["DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Banten", "DI Yogyakarta"];

function estimateShipping(subtotal: number, province: string | undefined) {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  if (!province) return 30_000;
  return JAVA.includes(province) ? 25_000 : 45_000;
}

export function CheckoutView() {
  const router = useRouter();
  const { items, summary, clear, hydrated } = useCart();
  const { t } = useTranslation();

  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState<ShippingFormValues | null>(null);
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState<{ code: string; amount: number; label: string } | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Redirect to cart if empty (after hydration).
  useEffect(() => {
    if (hydrated && items.length === 0) router.replace("/cart");
  }, [hydrated, items.length, router]);

  const shippingCost = useMemo(
    () => estimateShipping(summary.subtotal, shipping?.province),
    [summary.subtotal, shipping?.province]
  );
  const discount = promo?.amount ?? 0;
  const total = Math.max(0, summary.subtotal + shippingCost - discount);

  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: shipping ?? undefined,
  });

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    const found = PROMO_CODES[code];
    if (!found) {
      toast.error(t("checkout.invalidPromo"));
      return;
    }
    const amount =
      found.type === "percent"
        ? Math.round((summary.subtotal * found.value) / 100)
        : found.value;
    setPromo({ code, amount, label: found.label });
    toast.success(`${t("checkout.promoApplied")} — ${found.label}`);
  };

  const onShippingSubmit = (values: ShippingFormValues) => {
    setShipping(values);
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Move to the payment step with a fresh order reference for Pakasir.
  const startPayment = () => {
    const id = `LUX${Date.now().toString(36).toUpperCase()}${Math.random()
      .toString(36)
      .slice(2, 5)
      .toUpperCase()}`;
    setOrderId(id);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaid = () => {
    if (!orderId) return;
    clear();
    router.push(`/checkout/success?order_id=${encodeURIComponent(orderId)}`);
  };

  if (!hydrated || items.length === 0) {
    return <div className="min-h-[60vh]" />;
  }

  return (
    <div className="mx-auto max-w-site px-site pt-16 md:pt-24">
      <h1 className="font-display text-h1 font-light text-ivory">{t("checkout.title")}</h1>

      {/* Step indicator */}
      <div className="mt-8 flex items-center gap-3">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-full border font-mono text-xs transition-colors",
                  i < step
                    ? "border-gold bg-gold text-obsidian"
                    : i === step
                      ? "border-gold text-gold"
                      : "border-ash text-smoke"
                )}
              >
                {i < step ? <Check className="size-3.5" /> : i + 1}
              </span>
              <span
                className={cn(
                  "text-label uppercase tracking-label",
                  i <= step ? "text-ivory" : "text-smoke"
                )}
              >
                {t(label)}
              </span>
            </div>
            {i < STEPS.length - 1 && <span className="h-px w-8 bg-ash" />}
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 pb-24 lg:grid-cols-[1fr_400px]">
        {/* Left — step content */}
        <div>
          <AnimatePresence mode="wait">
            {/* STEP 1 — SHIPPING */}
            {step === 0 && (
              <motion.form
                key="shipping"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={form.handleSubmit(onShippingSubmit)}
                className="flex flex-col gap-5"
              >
                <h2 className="text-label uppercase tracking-label text-gold">{t("checkout.shippingInfo")}</h2>

                <Field label={t("checkout.fullName")} error={form.formState.errors.fullName?.message}>
                  <input {...form.register("fullName")} className={inputCls} placeholder={t("checkout.fullNamePh")} />
                </Field>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Field label={t("checkout.email")} error={form.formState.errors.email?.message}>
                    <input {...form.register("email")} className={inputCls} placeholder="you@email.com" />
                  </Field>
                  <Field label={t("checkout.phone")} error={form.formState.errors.phone?.message}>
                    <input {...form.register("phone")} className={inputCls} placeholder="+62 …" />
                  </Field>
                </div>

                <Field label={t("checkout.address")} error={form.formState.errors.address?.message}>
                  <input {...form.register("address")} className={inputCls} placeholder={t("checkout.addressPh")} />
                </Field>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                  <Field label={t("checkout.city")} error={form.formState.errors.city?.message}>
                    <input {...form.register("city")} className={inputCls} placeholder={t("checkout.cityPh")} />
                  </Field>
                  <Field label={t("checkout.province")} error={form.formState.errors.province?.message}>
                    <select {...form.register("province")} className={cn(inputCls, "appearance-none")}>
                      <option value="">{t("checkout.selectProvince")}</option>
                      {PROVINCES.map((p) => (
                        <option key={p} value={p} className="bg-charcoal">
                          {p}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label={t("checkout.postalCode")} error={form.formState.errors.postalCode?.message}>
                    <input {...form.register("postalCode")} className={inputCls} placeholder="12345" />
                  </Field>
                </div>

                <Field label={t("checkout.notes")}>
                  <textarea
                    {...form.register("notes")}
                    rows={3}
                    className={cn(inputCls, "resize-none")}
                    placeholder={t("checkout.notesPh")}
                  />
                </Field>

                <Button type="submit" variant="solid" size="lg" className="mt-2 self-start">
                  {t("checkout.continueReview")}
                </Button>
              </motion.form>
            )}

            {/* STEP 2 — REVIEW */}
            {step === 1 && shipping && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-8"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-label uppercase tracking-label text-gold">{t("checkout.reviewOrder")}</h2>
                  <button
                    onClick={() => setStep(0)}
                    className="inline-flex items-center gap-1.5 text-label uppercase tracking-label text-smoke hover:text-gold"
                  >
                    <Pencil className="size-3.5" /> {t("checkout.edit")}
                  </button>
                </div>

                <div className="border border-ash p-6">
                  <h3 className="text-caption uppercase tracking-wide text-smoke">{t("checkout.shipTo")}</h3>
                  <p className="mt-3 text-body text-ivory">{shipping.fullName}</p>
                  <p className="text-body text-mist">{shipping.address}</p>
                  <p className="text-body text-mist">
                    {shipping.city}, {shipping.province} {shipping.postalCode}
                  </p>
                  <p className="mt-2 text-caption text-smoke">
                    {shipping.email} · {shipping.phone}
                  </p>
                  {shipping.notes && (
                    <p className="mt-3 border-t border-ash pt-3 text-caption text-smoke">
                      {t("checkout.note")}: {shipping.notes}
                    </p>
                  )}
                </div>

                <div className="border border-ash">
                  {items.map((item) => (
                    <div key={item.key} className="flex gap-4 border-b border-ash p-4 last:border-b-0">
                      <div className="relative size-16 shrink-0 overflow-hidden bg-charcoal">
                        <ImageWithBlur src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="flex flex-1 items-center justify-between">
                        <div>
                          <p className="text-label uppercase tracking-label text-ivory">{item.name}</p>
                          <p className="mt-1 text-caption text-smoke">
                            {t("checkout.size")} {item.size} · {t("checkout.qty")} {item.quantity}
                          </p>
                        </div>
                        <p className="font-mono text-sm text-ivory">
                          {formatIDR(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="dark" size="lg" onClick={() => setStep(0)}>
                    <ChevronLeft className="size-4" /> {t("checkout.back")}
                  </Button>
                  <Button variant="solid" size="lg" className="flex-1" onClick={startPayment}>
                    {t("checkout.continuePayment")}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — PAYMENT (Pakasir, in-page) */}
            {step === 2 && orderId && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                <h2 className="text-label uppercase tracking-label text-gold">{t("checkout.payment")}</h2>
                <PakasirPayment
                  orderId={orderId}
                  amount={Math.round(total)}
                  onPaid={handlePaid}
                  onBack={() => setStep(1)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right — order summary */}
        <aside className="h-fit lg:sticky lg:top-[calc(var(--nav-h)+24px)]">
          <div className="border border-ash bg-void p-7">
            <h2 className="text-label uppercase tracking-label text-ivory">{t("checkout.orderSummary")}</h2>

            <div className="mt-5 max-h-64 space-y-4 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  <div className="relative size-12 shrink-0 overflow-hidden bg-charcoal">
                    <ImageWithBlur src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                    <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-gold font-mono text-[9px] text-obsidian">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-caption text-ivory">{item.name}</p>
                    <p className="text-caption text-smoke">{t("checkout.size")} {item.size}</p>
                  </div>
                  <p className="font-mono text-xs text-mist">{formatIDR(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            {/* Promo */}
            <div className="mt-6 flex gap-2 border-t border-ash pt-6">
              <input
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder={t("checkout.promoPh")}
                className="flex-1 border border-ash bg-transparent px-3 py-2.5 text-caption uppercase tracking-wide text-ivory placeholder:text-smoke focus:border-gold focus:outline-none"
              />
              <Button variant="dark" size="sm" onClick={applyPromo}>
                {t("checkout.apply")}
              </Button>
            </div>

            {/* Totals */}
            <div className="mt-6 flex flex-col gap-3 border-t border-ash pt-6 text-caption">
              <Row label={t("checkout.subtotal")} value={formatIDR(summary.subtotal)} />
              <Row
                label={t("checkout.shippingRow")}
                value={shippingCost === 0 ? t("checkout.free") : formatIDR(shippingCost)}
                accent={shippingCost === 0}
              />
              {promo && <Row label={`Promo (${promo.code})`} value={`− ${formatIDR(discount)}`} accent />}
              <div className="mt-2 flex items-center justify-between border-t border-ash pt-4">
                <span className="text-label uppercase tracking-label text-ivory">{t("checkout.total")}</span>
                <span className="font-mono text-base text-gold">{formatIDR(total)}</span>
              </div>
            </div>

            <Link
              href="/cart"
              className="mt-6 block text-center text-label uppercase tracking-label text-smoke transition-colors hover:text-ivory"
            >
              {t("checkout.backToCart")}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

const inputCls =
  "w-full border border-ash bg-transparent px-4 py-3 font-body text-body text-ivory placeholder:text-smoke transition-colors focus:border-gold focus:outline-none";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-label uppercase tracking-label text-mist">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-caption text-error">{error}</span>}
    </label>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-smoke">{label}</span>
      <span className={cn("font-mono", accent ? "text-success" : "text-mist")}>{value}</span>
    </div>
  );
}
