import type { Metadata } from "next";
import { LegalView } from "@/components/legal/LegalView";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How LUXAFOIR collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalView
      eyebrow={{ en: "Legal", id: "Legal" }}
      title={{ en: "Privacy Policy", id: "Kebijakan Privasi" }}
      description={{ en: "Last updated 26 May 2026.", id: "Terakhir diperbarui 26 Mei 2026." }}
      seeAlso={{ label: { en: "Terms & Conditions", id: "Syarat & Ketentuan" }, href: "/terms" }}
      sections={[
        {
          h: { en: "Who We Are", id: "Tentang Kami" },
          p: {
            en: "LUXAFOIR (“we”, “us”) is a streetwear label based in Pontianak, Kalimantan Barat, Indonesia, operating the website luxafoir.com. This policy explains how we handle your personal data when you visit our site or place an order.",
            id: "LUXAFOIR (“kami”) adalah label streetwear yang berbasis di Pontianak, Kalimantan Barat, Indonesia, dan mengoperasikan situs luxafoir.com. Kebijakan ini menjelaskan bagaimana kami menangani data pribadimu saat kamu mengunjungi situs atau melakukan pemesanan.",
          },
        },
        {
          h: { en: "Information We Collect", id: "Informasi yang Kami Kumpulkan" },
          p: {
            en: "We collect details you provide at checkout or sign-up: name, email, phone number, and shipping address. We also collect order details and basic, anonymous usage data (such as pages viewed) to improve the store.",
            id: "Kami mengumpulkan data yang kamu berikan saat checkout atau pendaftaran: nama, email, nomor HP, dan alamat pengiriman. Kami juga mengumpulkan detail pesanan dan data penggunaan anonim (seperti halaman yang dilihat) untuk meningkatkan layanan.",
          },
        },
        {
          h: { en: "How We Use Your Information", id: "Bagaimana Kami Menggunakannya" },
          p: {
            en: "To process and deliver your orders, send order and shipping updates, respond to your enquiries, and — only with your consent — share news about new collections and offers.",
            id: "Untuk memproses dan mengirim pesananmu, mengirim update pesanan & pengiriman, menjawab pertanyaanmu, dan — hanya dengan persetujuanmu — berbagi kabar koleksi baru dan penawaran.",
          },
        },
        {
          h: { en: "Payments", id: "Pembayaran" },
          p: {
            en: "Payments are processed by our trusted payment partner (Pakasir). Your card or e-wallet details are entered directly with the payment provider and are never stored on our servers.",
            id: "Pembayaran diproses oleh mitra pembayaran tepercaya kami (Pakasir). Detail kartu atau e-wallet kamu dimasukkan langsung ke penyedia pembayaran dan tidak pernah disimpan di server kami.",
          },
        },
        {
          h: { en: "Sharing Your Information", id: "Berbagi Informasi" },
          p: {
            en: "We share data only with the parties needed to fulfil your order — payment providers and shipping couriers. We never sell your personal data to anyone.",
            id: "Kami hanya membagikan data dengan pihak yang diperlukan untuk memenuhi pesananmu — penyedia pembayaran dan kurir pengiriman. Kami tidak pernah menjual data pribadimu kepada siapa pun.",
          },
        },
        {
          h: { en: "Cookies", id: "Cookies" },
          p: {
            en: "We use minimal cookies and local storage to keep your cart, wishlist, and preferences working. You can clear these anytime in your browser settings.",
            id: "Kami menggunakan cookies dan local storage seminimal mungkin agar keranjang, wishlist, dan preferensimu tetap berfungsi. Kamu bisa menghapusnya kapan saja di pengaturan browser.",
          },
        },
        {
          h: { en: "Data Security", id: "Keamanan Data" },
          p: {
            en: "We apply reasonable technical and organisational measures to protect your data. The site is served over HTTPS. No method of transmission is 100% secure, but we work to safeguard your information.",
            id: "Kami menerapkan langkah teknis dan organisasi yang wajar untuk melindungi datamu. Situs disajikan melalui HTTPS. Tidak ada metode transmisi yang 100% aman, namun kami berupaya menjaga informasimu.",
          },
        },
        {
          h: { en: "Your Rights", id: "Hak Kamu" },
          p: {
            en: "You may request access to, correction of, or deletion of your personal data, and you may unsubscribe from marketing emails at any time. Contact us using the details below.",
            id: "Kamu dapat meminta akses, koreksi, atau penghapusan data pribadimu, dan dapat berhenti berlangganan email marketing kapan saja. Hubungi kami lewat detail di bawah.",
          },
        },
        {
          h: { en: "Contact", id: "Kontak" },
          p: {
            en: "Questions about this policy? Email studio@luxafoir.com or message us on WhatsApp at +62 852-6440-2640.",
            id: "Ada pertanyaan tentang kebijakan ini? Email studio@luxafoir.com atau chat WhatsApp di +62 852-6440-2640.",
          },
        },
      ]}
    />
  );
}
