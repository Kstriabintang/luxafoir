import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shop/PageHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How LUXAFOIR collects, uses, and protects your personal data.",
};

const SECTIONS = [
  {
    h: "Who We Are",
    p: "LUXAFOIR (“we”, “us”) is a streetwear label based in Pontianak, Kalimantan Barat, Indonesia, operating the website luxafoir.com. This policy explains how we handle your personal data when you visit our site or place an order.",
  },
  {
    h: "Information We Collect",
    p: "We collect details you provide at checkout or sign-up: name, email, phone number, and shipping address. We also collect order details and basic, anonymous usage data (such as pages viewed) to improve the store.",
  },
  {
    h: "How We Use Your Information",
    p: "To process and deliver your orders, send order and shipping updates, respond to your enquiries, and — only with your consent — share news about new collections and offers.",
  },
  {
    h: "Payments",
    p: "Payments are processed by trusted third-party payment gateways. Your card or e-wallet details are entered directly with the payment provider and are never stored on our servers.",
  },
  {
    h: "Sharing Your Information",
    p: "We share data only with the parties needed to fulfil your order — payment providers and shipping couriers. We never sell your personal data to anyone.",
  },
  {
    h: "Cookies",
    p: "We use minimal cookies and local storage to keep your cart, wishlist, and preferences working. You can clear these anytime in your browser settings.",
  },
  {
    h: "Data Security",
    p: "We apply reasonable technical and organisational measures to protect your data. The site is served over HTTPS. No method of transmission is 100% secure, but we work to safeguard your information.",
  },
  {
    h: "Your Rights",
    p: "You may request access to, correction of, or deletion of your personal data, and you may unsubscribe from marketing emails at any time. Contact us using the details below.",
  },
  {
    h: "Contact",
    p: "Questions about this policy? Email studio@luxafoir.com or message us on WhatsApp at +62 852-6440-2640.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated 26 May 2026."
      />
      <div className="mx-auto mt-12 max-w-2xl px-site">
        <div className="divide-y divide-ash border-y border-ash">
          {SECTIONS.map((s) => (
            <section key={s.h} className="py-7">
              <h2 className="text-label uppercase tracking-label text-gold">{s.h}</h2>
              <p className="mt-3 text-body leading-relaxed text-mist">{s.p}</p>
            </section>
          ))}
        </div>
        <p className="mt-10 text-caption text-smoke">
          See also our{" "}
          <Link href="/terms" className="text-gold underline-offset-4 hover:underline">
            Terms &amp; Conditions
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
