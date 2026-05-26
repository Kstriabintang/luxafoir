import type { Metadata } from "next";
import { LegalView } from "@/components/legal/LegalView";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Shipping times, rates, and coverage for LUXAFOIR orders across Indonesia.",
};

export default function ShippingPage() {
  return (
    <LegalView
      eyebrow={{ en: "Support", id: "Bantuan" }}
      title={{ en: "Shipping Policy", id: "Kebijakan Pengiriman" }}
      description={{
        en: "Where we ship, how fast, and what it costs.",
        id: "Ke mana kami kirim, secepat apa, dan berapa biayanya.",
      }}
      sections={[
        {
          h: { en: "Processing", id: "Pemrosesan" },
          p: {
            en: "Orders are picked, checked, and dispatched within 1–2 business days. You'll receive a confirmation email with tracking once your order ships.",
            id: "Pesanan disiapkan, diperiksa, dan dikirim dalam 1–2 hari kerja. Kamu akan menerima email konfirmasi beserta nomor resi begitu pesanan dikirim.",
          },
        },
        {
          h: { en: "Rates", id: "Tarif" },
          p: {
            en: "Free shipping on all orders above Rp500.000. Below that, a flat rate is shown at checkout — Rp25.000 within Java and Rp45.000 to other provinces.",
            id: "Gratis ongkir untuk setiap pesanan di atas Rp500.000. Di bawah itu, tarif flat tampil saat checkout — Rp25.000 untuk Pulau Jawa dan Rp45.000 untuk provinsi lain.",
          },
        },
        {
          h: { en: "Delivery Times", id: "Estimasi Pengiriman" },
          p: {
            en: "Java: 2–4 business days. Sumatra, Bali & Kalimantan: 3–6 days. Eastern Indonesia: 5–9 days. Delays can occur during peak periods.",
            id: "Jawa: 2–4 hari kerja. Sumatra, Bali & Kalimantan: 3–6 hari. Indonesia Timur: 5–9 hari. Bisa ada keterlambatan saat masa sibuk.",
          },
        },
        {
          h: { en: "Tracking", id: "Pelacakan" },
          p: {
            en: "Every order includes end-to-end tracking. If your parcel hasn't moved in 48 hours, reach us via the Contact page and we'll chase it for you.",
            id: "Setiap pesanan dilengkapi pelacakan ujung-ke-ujung. Jika paketmu tidak bergerak dalam 48 jam, hubungi kami lewat halaman Kontak dan kami bantu telusuri.",
          },
        },
      ]}
    />
  );
}
