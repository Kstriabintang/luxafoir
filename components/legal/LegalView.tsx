"use client";

import Link from "next/link";
import { PageHeader } from "@/components/shop/PageHeader";
import { useTranslation } from "@/components/i18n/LanguageProvider";

type L = { en: string; id: string };
export interface LegalSection {
  h: L;
  p: L;
}
export interface LegalViewProps {
  eyebrow: L;
  title: L;
  description: L;
  sections: LegalSection[];
  seeAlso?: { label: L; href: string };
}

/** Bilingual policy page renderer (shared by shipping/returns/terms/privacy). */
export function LegalView({ eyebrow, title, description, sections, seeAlso }: LegalViewProps) {
  const { lang } = useTranslation();
  const tr = (x: L) => x[lang];

  return (
    <div className="pb-24">
      <PageHeader eyebrow={tr(eyebrow)} title={tr(title)} description={tr(description)} />
      <div className="mx-auto mt-12 max-w-2xl px-site">
        <div className="divide-y divide-ash border-y border-ash">
          {sections.map((s) => (
            <section key={s.h.en} className="py-7">
              <h2 className="text-label uppercase tracking-label text-gold">{tr(s.h)}</h2>
              <p className="mt-3 text-body leading-relaxed text-mist">{tr(s.p)}</p>
            </section>
          ))}
        </div>
        {seeAlso && (
          <p className="mt-10 text-caption text-smoke">
            {lang === "id" ? "Lihat juga " : "See also our "}
            <Link href={seeAlso.href} className="text-gold underline-offset-4 hover:underline">
              {tr(seeAlso.label)}
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}
