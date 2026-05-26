"use client";

import Link from "next/link";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { useTranslation } from "@/components/i18n/LanguageProvider";

const PAYMENTS = ["QRIS", "BNI", "BRI", "CIMB", "Permata", "Maybank"];

type FooterLink = { label: string; tKey: string; href: string };

function FooterColumn({
  title,
  links,
  t,
}: {
  title: string;
  links: ReadonlyArray<FooterLink>;
  t: (k: string) => string;
}) {
  return (
    <div>
      <h4 className="text-label uppercase tracking-label text-gold-bright">{title}</h4>
      <ul className="mt-6 flex flex-col gap-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-body text-white/55 transition-colors duration-300 hover:text-white"
            >
              {t(l.tKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Footer is intentionally kept dark for a premium contrast against the light store.
export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="relative border-t border-white/10 bg-obsidian text-white">
      <div className="mx-auto max-w-site px-site py-16 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display text-3xl font-bold italic text-white">
              LUXAFOIR
            </Link>
            <p className="mt-4 max-w-xs text-body text-white/45">{t("footer.tagline")}</p>
            <div className="mt-6 flex gap-5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="text-label uppercase tracking-label text-white/45 transition-colors hover:text-gold-bright"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title={t("footer.shop")} links={FOOTER_LINKS.shop} t={t} />
          <FooterColumn title={t("footer.info")} links={FOOTER_LINKS.info} t={t} />
          <FooterColumn title={t("footer.support")} links={FOOTER_LINKS.support} t={t} />
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-caption uppercase tracking-wide text-white/45">{t("footer.rights")}</p>

          <div className="flex flex-wrap items-center gap-2">
            {PAYMENTS.map((p) => (
              <span
                key={p}
                className="rounded-sm border border-white/15 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-white/55"
              >
                {p}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-label uppercase tracking-label text-white/55">
            <button className="text-gold-bright">IDR</button>
            <span className="text-white/25">/</span>
            <button className="transition-colors hover:text-white">USD</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
