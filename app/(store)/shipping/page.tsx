import type { Metadata } from "next";
import { PageHeader } from "@/components/shop/PageHeader";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Shipping times, rates, and coverage for LUXAFOIR orders across Indonesia.",
};

const SECTIONS = [
  {
    h: "Processing",
    p: "Orders are picked, checked, and dispatched within 1–2 business days. You'll receive a confirmation email with tracking once your order ships.",
  },
  {
    h: "Rates",
    p: "Free shipping on all orders above Rp500.000. Below that, a flat rate is shown at checkout — Rp25.000 within Java and Rp45.000 to other provinces.",
  },
  {
    h: "Delivery Times",
    p: "Java: 2–4 business days. Sumatra, Bali & Kalimantan: 3–6 days. Eastern Indonesia: 5–9 days. Delays can occur during peak periods.",
  },
  {
    h: "Tracking",
    p: "Every order includes end-to-end tracking. If your parcel hasn't moved in 48 hours, reach us via the Contact page and we'll chase it for you.",
  },
];

export default function ShippingPage() {
  return (
    <div className="pb-24">
      <PageHeader eyebrow="Support" title="Shipping Policy" description="Where we ship, how fast, and what it costs." />
      <div className="mx-auto mt-12 max-w-2xl px-site">
        <div className="divide-y divide-ash border-y border-ash">
          {SECTIONS.map((s) => (
            <section key={s.h} className="py-7">
              <h2 className="text-label uppercase tracking-label text-gold">{s.h}</h2>
              <p className="mt-3 text-body leading-relaxed text-mist">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
