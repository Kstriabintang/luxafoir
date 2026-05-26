import type { Metadata } from "next";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { PageHeader } from "@/components/shop/PageHeader";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with LUXAFOIR — WhatsApp, email, and studio in Pontianak, Indonesia.",
};

const WHATSAPP = "6285264402640";
const WHATSAPP_TEXT = encodeURIComponent("Halo LUXAFOIR, saya mau bertanya tentang produk.");

const CHANNELS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+62 852-6440-2640",
    hint: "Fastest response — orders & questions",
  },
  {
    icon: Mail,
    label: "Email",
    value: "studio@luxafoir.com",
    hint: "Customer care, press & wholesale",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "Pontianak, Kalimantan Barat",
    hint: "Indonesia — by appointment",
  },
];

export default function ContactPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact"
        description="We typically respond within a few hours during business days."
      />

      <div className="mx-auto mt-12 max-w-2xl px-site">
        {/* WhatsApp CTA */}
        <div className="flex flex-col items-center gap-5 border border-ash bg-[#F8F7F5] px-6 py-12 text-center">
          <MessageCircle className="size-8 text-gold" strokeWidth={1.5} />
          <div>
            <h2 className="font-display text-2xl font-light text-[#0A0A0A]">
              Chat with us on WhatsApp
            </h2>
            <p className="mt-2 text-body text-mist">
              The quickest way to reach us for orders, sizing, and questions.
            </p>
          </div>
          <Button asChild variant="solid" size="lg">
            <a
              href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_TEXT}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="size-4" strokeWidth={2} />
              Message +62 852-6440-2640
            </a>
          </Button>
        </div>

        {/* Channels */}
        <div className="mt-px grid grid-cols-1 gap-px border border-ash sm:grid-cols-3">
          {CHANNELS.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.label} className="border border-ash p-7">
                <Icon className="size-5 text-gold" strokeWidth={1.5} />
                <h3 className="mt-5 text-label uppercase tracking-label text-gold">{c.label}</h3>
                <p className="mt-2 text-body text-[#0A0A0A]">{c.value}</p>
                <p className="mt-1 text-caption text-smoke">{c.hint}</p>
              </div>
            );
          })}
        </div>

        {/* Social */}
        <div className="mt-10 text-center">
          <p className="text-caption uppercase tracking-wide text-smoke">Follow @luxafoir</p>
          <div className="mt-3 flex justify-center gap-6">
            <a
              href="https://instagram.com/luxafoir"
              target="_blank"
              rel="noreferrer"
              className="link-underline text-label uppercase tracking-label text-[#0A0A0A] hover:text-gold"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com/@luxafoir"
              target="_blank"
              rel="noreferrer"
              className="link-underline text-label uppercase tracking-label text-[#0A0A0A] hover:text-gold"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
