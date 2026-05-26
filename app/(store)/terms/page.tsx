import type { Metadata } from "next";
import { LegalView } from "@/components/legal/LegalView";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms governing your use of luxafoir.com and your purchases.",
};

export default function TermsPage() {
  return (
    <LegalView
      eyebrow={{ en: "Legal", id: "Legal" }}
      title={{ en: "Terms & Conditions", id: "Syarat & Ketentuan" }}
      description={{ en: "Last updated 26 May 2026.", id: "Terakhir diperbarui 26 Mei 2026." }}
      seeAlso={{ label: { en: "Privacy Policy", id: "Kebijakan Privasi" }, href: "/privacy-policy" }}
      sections={[
        {
          h: { en: "Acceptance of Terms", id: "Penerimaan Ketentuan" },
          p: {
            en: "By accessing luxafoir.com or placing an order, you agree to these Terms & Conditions. If you do not agree, please do not use the site.",
            id: "Dengan mengakses luxafoir.com atau melakukan pemesanan, kamu menyetujui Syarat & Ketentuan ini. Jika tidak setuju, mohon untuk tidak menggunakan situs ini.",
          },
        },
        {
          h: { en: "Products & Pricing", id: "Produk & Harga" },
          p: {
            en: "All prices are listed in Indonesian Rupiah (IDR) and include applicable taxes unless stated otherwise. We may update prices, descriptions, and availability at any time. We strive for accuracy but do not warrant that all content is error-free.",
            id: "Semua harga tercantum dalam Rupiah (IDR) dan sudah termasuk pajak yang berlaku kecuali dinyatakan lain. Kami dapat memperbarui harga, deskripsi, dan ketersediaan sewaktu-waktu. Kami berupaya akurat namun tidak menjamin seluruh konten bebas kesalahan.",
          },
        },
        {
          h: { en: "Orders & Payment", id: "Pesanan & Pembayaran" },
          p: {
            en: "An order is confirmed once payment is successfully completed through our payment provider (Pakasir). We reserve the right to refuse or cancel any order — for example, if an item is out of stock or a pricing error occurs — and will refund any amount paid.",
            id: "Pesanan dikonfirmasi setelah pembayaran berhasil melalui penyedia pembayaran kami (Pakasir). Kami berhak menolak atau membatalkan pesanan — misalnya jika stok habis atau terjadi kesalahan harga — dan akan mengembalikan dana yang sudah dibayarkan.",
          },
        },
        {
          h: { en: "Shipping", id: "Pengiriman" },
          p: {
            en: "Delivery times and rates are described in our Shipping Policy. Title and risk pass to you upon delivery to the address you provide.",
            id: "Estimasi dan tarif pengiriman dijelaskan di Kebijakan Pengiriman. Kepemilikan dan risiko beralih kepadamu saat barang diterima di alamat yang kamu berikan.",
          },
        },
        {
          h: { en: "Returns & Exchanges", id: "Pengembalian & Penukaran" },
          p: {
            en: "Eligible items may be returned within 14 days as set out in our Return Policy. Items must be unworn, with tags attached.",
            id: "Barang yang memenuhi syarat dapat diretur dalam 14 hari sesuai Kebijakan Pengembalian. Barang harus belum dipakai dengan label terpasang.",
          },
        },
        {
          h: { en: "Intellectual Property", id: "Hak Kekayaan Intelektual" },
          p: {
            en: "All content on this site — logos, designs, text, and imagery — is the property of LUXAFOIR and may not be reproduced without written permission.",
            id: "Seluruh konten di situs ini — logo, desain, teks, dan gambar — adalah milik LUXAFOIR dan tidak boleh diperbanyak tanpa izin tertulis.",
          },
        },
        {
          h: { en: "Acceptable Use", id: "Penggunaan yang Wajar" },
          p: {
            en: "You agree not to misuse the site, attempt to disrupt it, or use it for any unlawful purpose.",
            id: "Kamu setuju untuk tidak menyalahgunakan situs, mengganggu operasinya, atau menggunakannya untuk tujuan yang melanggar hukum.",
          },
        },
        {
          h: { en: "Limitation of Liability", id: "Batasan Tanggung Jawab" },
          p: {
            en: "To the extent permitted by law, LUXAFOIR is not liable for indirect or consequential losses arising from the use of this site or our products.",
            id: "Sejauh diizinkan oleh hukum, LUXAFOIR tidak bertanggung jawab atas kerugian tidak langsung atau konsekuensial yang timbul dari penggunaan situs atau produk kami.",
          },
        },
        {
          h: { en: "Governing Law", id: "Hukum yang Berlaku" },
          p: {
            en: "These terms are governed by the laws of the Republic of Indonesia.",
            id: "Ketentuan ini tunduk pada hukum Republik Indonesia.",
          },
        },
        {
          h: { en: "Contact", id: "Kontak" },
          p: {
            en: "For any questions about these terms, email studio@luxafoir.com or message +62 852-6440-2640 on WhatsApp.",
            id: "Untuk pertanyaan tentang ketentuan ini, email studio@luxafoir.com atau chat +62 852-6440-2640 via WhatsApp.",
          },
        },
      ]}
    />
  );
}
