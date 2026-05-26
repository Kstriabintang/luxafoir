import type { Metadata } from "next";
import { LegalView } from "@/components/legal/LegalView";

export const metadata: Metadata = {
  title: "Return Policy",
  description: "How to return or exchange LUXAFOIR pieces within 14 days.",
};

export default function ReturnsPage() {
  return (
    <LegalView
      eyebrow={{ en: "Support", id: "Bantuan" }}
      title={{ en: "Return Policy", id: "Kebijakan Pengembalian" }}
      description={{
        en: "Simple, fair returns within 14 days.",
        id: "Pengembalian mudah dan adil dalam 14 hari.",
      }}
      sections={[
        {
          h: { en: "14-Day Returns", id: "Pengembalian 14 Hari" },
          p: {
            en: "Changed your mind? Return unworn pieces within 14 days of delivery for a full refund to your original payment method.",
            id: "Berubah pikiran? Kembalikan barang yang belum dipakai dalam 14 hari sejak diterima untuk refund penuh ke metode pembayaran asalmu.",
          },
        },
        {
          h: { en: "Condition", id: "Kondisi" },
          p: {
            en: "Items must be unworn and unwashed, with all original tags attached and in their original packaging.",
            id: "Barang harus belum dipakai dan belum dicuci, dengan semua label asli terpasang dan dalam kemasan aslinya.",
          },
        },
        {
          h: { en: "Exchanges", id: "Penukaran" },
          p: {
            en: "Need a different size? Start a return and place a new order — it's the fastest way to get the size you want before it sells out.",
            id: "Butuh ukuran lain? Mulai pengembalian lalu buat pesanan baru — cara tercepat dapat ukuran yang kamu mau sebelum kehabisan.",
          },
        },
        {
          h: { en: "How to Start", id: "Cara Memulai" },
          p: {
            en: "Email us via the Contact page with your order number. We'll send a return label and instructions within one business day.",
            id: "Email kami lewat halaman Kontak dengan nomor pesananmu. Kami kirim label retur dan instruksinya dalam satu hari kerja.",
          },
        },
        {
          h: { en: "Final Sale", id: "Final Sale" },
          p: {
            en: "Items marked as final sale and any worn or washed pieces are not eligible for return.",
            id: "Barang bertanda final sale serta barang yang sudah dipakai atau dicuci tidak bisa diretur.",
          },
        },
      ]}
    />
  );
}
