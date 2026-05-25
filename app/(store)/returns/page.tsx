import type { Metadata } from "next";
import { PageHeader } from "@/components/shop/PageHeader";

export const metadata: Metadata = {
  title: "Return Policy",
  description: "How to return or exchange LUXAFOIR pieces within 14 days.",
};

const SECTIONS = [
  {
    h: "14-Day Returns",
    p: "Changed your mind? Return unworn pieces within 14 days of delivery for a full refund to your original payment method.",
  },
  {
    h: "Condition",
    p: "Items must be unworn and unwashed, with all original tags attached and in their original packaging.",
  },
  {
    h: "Exchanges",
    p: "Need a different size? Start a return and place a new order — it's the fastest way to get the size you want before it sells out.",
  },
  {
    h: "How to Start",
    p: "Email us via the Contact page with your order number. We'll send a return label and instructions within one business day.",
  },
  {
    h: "Final Sale",
    p: "Items marked as final sale and any worn or washed pieces are not eligible for return.",
  },
];

export default function ReturnsPage() {
  return (
    <div className="pb-24">
      <PageHeader eyebrow="Support" title="Return Policy" description="Simple, fair returns within 14 days." />
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
