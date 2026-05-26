"use client";

import { MessageCircle, Mail, MapPin } from "lucide-react";
import { PageHeader } from "@/components/shop/PageHeader";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/components/i18n/LanguageProvider";

const WHATSAPP = "6285264402640";
const WHATSAPP_TEXT = encodeURIComponent("Halo LUXAFOIR, saya mau bertanya tentang produk.");

export function ContactView() {
  const { t } = useTranslation();

  const channels = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+62 852-6440-2640",
      hint: t("contact.waHint"),
    },
    {
      icon: Mail,
      label: t("contact.emailLabel"),
      value: "studio@luxafoir.com",
      hint: t("contact.emailHint"),
    },
    {
      icon: MapPin,
      label: t("contact.studioLabel"),
      value: "Pontianak, Kalimantan Barat",
      hint: t("contact.studioHint"),
    },
  ];

  return (
    <div className="pb-24">
      <PageHeader
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        description={t("contact.desc")}
      />

      <div className="mx-auto mt-12 max-w-2xl px-site">
        {/* WhatsApp CTA */}
        <div className="flex flex-col items-center gap-5 border border-ash bg-[#F8F7F5] px-6 py-12 text-center">
          <MessageCircle className="size-8 text-gold" strokeWidth={1.5} />
          <div>
            <h2 className="font-display text-2xl font-light text-[#0A0A0A]">{t("contact.waTitle")}</h2>
            <p className="mt-2 text-body text-mist">{t("contact.waDesc")}</p>
          </div>
          <Button asChild variant="solid" size="lg">
            <a href={`https://wa.me/${WHATSAPP}?text=${WHATSAPP_TEXT}`} target="_blank" rel="noreferrer">
              <MessageCircle className="size-4" strokeWidth={2} />
              {t("contact.waBtn")} +62 852-6440-2640
            </a>
          </Button>
        </div>

        {/* Channels */}
        <div className="mt-px grid grid-cols-1 gap-px border border-ash sm:grid-cols-3">
          {channels.map((c) => {
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
          <p className="text-caption uppercase tracking-wide text-smoke">{t("contact.follow")} @luxafoir</p>
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
