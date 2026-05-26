import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shop/PageHeader";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms governing your use of luxafoir.com and your purchases.",
};

const SECTIONS = [
  {
    h: "Acceptance of Terms",
    p: "By accessing luxafoir.com or placing an order, you agree to these Terms & Conditions. If you do not agree, please do not use the site.",
  },
  {
    h: "Products & Pricing",
    p: "All prices are listed in Indonesian Rupiah (IDR) and include applicable taxes unless stated otherwise. We may update prices, descriptions, and availability at any time. We strive for accuracy but do not warrant that all content is error-free.",
  },
  {
    h: "Orders & Payment",
    p: "An order is confirmed once payment is successfully completed through our payment provider. We reserve the right to refuse or cancel any order — for example, if an item is out of stock or a pricing error occurs — and will refund any amount paid.",
  },
  {
    h: "Shipping",
    p: "Delivery times and rates are described in our Shipping Policy. Title and risk pass to you upon delivery to the address you provide.",
  },
  {
    h: "Returns & Exchanges",
    p: "Eligible items may be returned within 14 days as set out in our Return Policy. Items must be unworn, with tags attached.",
  },
  {
    h: "Intellectual Property",
    p: "All content on this site — logos, designs, text, and imagery — is the property of LUXAFOIR and may not be reproduced without written permission.",
  },
  {
    h: "Acceptable Use",
    p: "You agree not to misuse the site, attempt to disrupt it, or use it for any unlawful purpose.",
  },
  {
    h: "Limitation of Liability",
    p: "To the extent permitted by law, LUXAFOIR is not liable for indirect or consequential losses arising from the use of this site or our products.",
  },
  {
    h: "Governing Law",
    p: "These terms are governed by the laws of the Republic of Indonesia.",
  },
  {
    h: "Contact",
    p: "For any questions about these terms, email studio@luxafoir.com or message +62 852-6440-2640 on WhatsApp.",
  },
];

export default function TermsPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
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
          <Link href="/privacy-policy" className="text-gold underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
