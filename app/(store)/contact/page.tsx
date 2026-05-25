import type { Metadata } from "next";
import { PageHeader } from "@/components/shop/PageHeader";
import { SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the LUXAFOIR studio — support, press, and wholesale.",
};

const CHANNELS = [
  { label: "Customer Care", value: "care@luxafoir.com", hint: "Orders, sizing, returns" },
  { label: "Press", value: "press@luxafoir.com", hint: "Media & collaborations" },
  { label: "Studio", value: "Jakarta, Indonesia", hint: "By appointment only" },
];

export default function ContactPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact"
        description="We typically respond within one business day."
      />
      <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-px border border-ash sm:grid-cols-3">
        {CHANNELS.map((c) => (
          <div key={c.label} className="border border-ash p-7">
            <h2 className="text-label uppercase tracking-label text-gold">{c.label}</h2>
            <p className="mt-4 text-body text-[#0A0A0A]">{c.value}</p>
            <p className="mt-1 text-caption text-smoke">{c.hint}</p>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-2xl px-site">
        <p className="text-caption uppercase tracking-wide text-smoke">Follow</p>
        <div className="mt-3 flex gap-6">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="link-underline text-label uppercase tracking-label text-[#0A0A0A] hover:text-gold"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
