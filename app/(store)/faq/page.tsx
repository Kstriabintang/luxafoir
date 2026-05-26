import type { Metadata } from "next";
import { PageHeader } from "@/components/shop/PageHeader";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about LUXAFOIR orders, shipping, sizing and returns.",
};

const FAQS = [
  {
    q: "How long does shipping take?",
    a: "Orders are dispatched within 1–2 business days. Delivery within Java typically takes 2–4 days; the rest of Indonesia 4–7 days.",
  },
  {
    q: "Is shipping free?",
    a: "Shipping is free for all orders above Rp500.000. Below that, a flat rate is calculated at checkout based on your province.",
  },
  {
    q: "How do I choose the right size?",
    a: "Each product page links to a size guide with garment measurements in centimetres. Our pieces run oversized — size down for a regular fit.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept QRIS and Virtual Account transfers (BNI, BRI, CIMB Niaga, Permata, Maybank) through our secure Pakasir checkout — the QR code and VA number appear right on the page.",
  },
  {
    q: "Can I return or exchange an item?",
    a: "Yes — unworn pieces with tags attached can be returned within 14 days. See our Return Policy for details.",
  },
];

export default function FaqPage() {
  return (
    <div className="pb-24">
      <PageHeader eyebrow="Support" title="FAQ" description="Answers to the questions we hear most." />
      <div className="mx-auto mt-12 max-w-2xl px-site">
        <Accordion type="single" collapsible>
          {FAQS.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
