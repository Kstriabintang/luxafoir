"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { Check, ChevronLeft, Copy, Loader2, ShieldCheck } from "lucide-react";
import { cn, formatIDR } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  PAKASIR_METHODS,
  PAKASIR_SANDBOX,
  type PakasirMethod,
  type PakasirPayment as Payment,
} from "@/lib/pakasir";

interface Props {
  orderId: string;
  /** Order total (IDR) sent to Pakasir; their fee is added on their side. */
  amount: number;
  onPaid: () => void;
  onBack: () => void;
}

function useCountdown(expiry?: string) {
  const [left, setLeft] = useState<number>(0);
  useEffect(() => {
    if (!expiry) return;
    const end = new Date(expiry).getTime();
    const tick = () => setLeft(Math.max(0, Math.floor((end - Date.now()) / 1000)));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [expiry]);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return left > 0 ? `${mm}:${ss}` : null;
}

export function PakasirPayment({ orderId, amount, onPaid, onBack }: Props) {
  const [method, setMethod] = useState<PakasirMethod>(PAKASIR_METHODS[0]);
  const [creating, setCreating] = useState(false);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [simulating, setSimulating] = useState(false);
  const paidRef = useRef(false);
  const countdown = useCountdown(payment?.expired_at);

  const createTransaction = async () => {
    setCreating(true);
    try {
      const res = await fetch("/api/pakasir/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId, amount, method: method.value }),
      });
      const data = await res.json();
      if (!res.ok || !data.payment) throw new Error(data.error ?? "Gagal membuat transaksi");
      setPayment(data.payment);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Gagal membuat transaksi");
    } finally {
      setCreating(false);
    }
  };

  // Poll the authoritative status until the payment completes.
  const checkStatus = useCallback(async () => {
    if (!payment || paidRef.current) return;
    try {
      const res = await fetch(
        `/api/pakasir/status?order_id=${encodeURIComponent(orderId)}&amount=${amount}`
      );
      const data = await res.json();
      if (data.status === "completed" && !paidRef.current) {
        paidRef.current = true;
        toast.success("Pembayaran diterima — terima kasih!");
        onPaid();
      }
    } catch {
      /* network hiccup — keep polling */
    }
  }, [payment, orderId, amount, onPaid]);

  useEffect(() => {
    if (!payment) return;
    const t = setInterval(checkStatus, 4000);
    return () => clearInterval(t);
  }, [payment, checkStatus]);

  const simulate = async () => {
    setSimulating(true);
    try {
      await fetch("/api/pakasir/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId, amount }),
      });
      await checkStatus();
    } catch {
      toast.error("Simulasi gagal");
    } finally {
      setSimulating(false);
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Disalin");
  };

  // ── Method picker (before a transaction exists) ──
  if (!payment) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-3 border border-ash p-6">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.5} />
          <div>
            <p className="text-body text-ivory">Pembayaran aman lewat Pakasir</p>
            <p className="mt-1.5 text-caption text-smoke">
              Pilih metode — QRIS atau Virtual Account. QR code & nomor VA tampil langsung
              di halaman ini, tanpa keluar dari LUXAFOIR.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {PAKASIR_METHODS.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => setMethod(m)}
              className={cn(
                "flex items-center justify-between border px-4 py-3.5 text-left transition-colors",
                method.value === m.value
                  ? "border-gold bg-void"
                  : "border-ash hover:border-smoke"
              )}
            >
              <span className="text-body text-ivory">{m.label}</span>
              <span
                className={cn(
                  "flex size-4 items-center justify-center rounded-full border",
                  method.value === m.value ? "border-gold bg-gold" : "border-ash"
                )}
              >
                {method.value === m.value && <Check className="size-3 text-obsidian" />}
              </span>
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <Button variant="dark" size="lg" onClick={onBack}>
            <ChevronLeft className="size-4" /> Kembali
          </Button>
          <Button
            variant="solid"
            size="lg"
            className="flex-1"
            loading={creating}
            onClick={createTransaction}
          >
            Bayar {formatIDR(amount)}
          </Button>
        </div>
      </div>
    );
  }

  // ── Active transaction (QR / VA shown in-page) ──
  const isQris = payment.payment_method === "qris";
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-label uppercase tracking-label text-gold">
          {isQris ? "Scan QRIS" : "Virtual Account"}
        </h3>
        {countdown && (
          <span className="font-mono text-caption text-smoke">
            Bayar dalam <span className="text-ivory">{countdown}</span>
          </span>
        )}
      </div>

      <div className="flex flex-col items-center gap-5 border border-ash bg-void p-7">
        {isQris ? (
          <>
            <div className="rounded-lg bg-white p-4">
              <QRCodeSVG value={payment.payment_number} size={208} level="M" />
            </div>
            <p className="text-center text-caption text-smoke">
              Buka aplikasi e-wallet / m-banking, scan kode di atas.
            </p>
          </>
        ) : (
          <div className="w-full">
            <p className="text-center text-caption uppercase tracking-wide text-smoke">
              Nomor Virtual Account
            </p>
            <button
              onClick={() => copy(payment.payment_number)}
              className="mt-3 flex w-full items-center justify-between gap-3 border border-ash bg-charcoal px-4 py-3.5 transition-colors hover:border-gold"
            >
              <span className="break-all font-mono text-base text-ivory">
                {payment.payment_number}
              </span>
              <Copy className="size-4 shrink-0 text-gold" strokeWidth={1.5} />
            </button>
            <p className="mt-2 text-center text-caption text-smoke">
              Transfer tepat sesuai total di bawah, lalu tunggu konfirmasi otomatis.
            </p>
          </div>
        )}

        <div className="w-full border-t border-ash pt-5 text-caption">
          <div className="flex items-center justify-between text-smoke">
            <span>Total pesanan</span>
            <span className="font-mono text-mist">{formatIDR(payment.amount)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-smoke">
            <span>Biaya admin</span>
            <span className="font-mono text-mist">{formatIDR(payment.fee)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-ash pt-3">
            <span className="text-label uppercase tracking-label text-ivory">Total bayar</span>
            <span className="font-mono text-base text-gold">{formatIDR(payment.total_payment)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-caption text-smoke">
        <Loader2 className="size-3.5 animate-spin text-gold" />
        Menunggu pembayaran… halaman ini otomatis lanjut setelah dibayar.
      </div>

      {PAKASIR_SANDBOX && (
        <Button variant="outline" size="lg" loading={simulating} onClick={simulate}>
          Simulasi Pembayaran Berhasil (Sandbox)
        </Button>
      )}

      <button
        onClick={onBack}
        className="text-center text-label uppercase tracking-label text-smoke transition-colors hover:text-ivory"
      >
        Ganti metode pembayaran
      </button>
    </div>
  );
}
