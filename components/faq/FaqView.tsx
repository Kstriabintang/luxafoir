"use client";

import { PageHeader } from "@/components/shop/PageHeader";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import { useTranslation } from "@/components/i18n/LanguageProvider";

export function FaqView() {
  const { t } = useTranslation();
  const faqs = [1, 2, 3, 4, 5].map((n) => ({ q: t(`faq.q${n}`), a: t(`faq.a${n}`) }));

  return (
    <div className="pb-24">
      <PageHeader eyebrow={t("faq.eyebrow")} title={t("faq.title")} description={t("faq.desc")} />
      <div className="mx-auto mt-12 max-w-2xl px-site">
        <Accordion type="single" collapsible>
          {faqs.map((f) => (
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
