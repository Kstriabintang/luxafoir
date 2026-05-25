import Link from "next/link";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";

const PAYMENTS = ["VISA", "Mastercard", "GoPay", "OVO", "QRIS", "BCA"];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h4 className="text-label uppercase tracking-label text-gold-bright">{title}</h4>
      <ul className="mt-6 flex flex-col gap-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-body text-white/55 transition-colors duration-300 hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Footer is intentionally kept dark for a premium contrast against the light store.
export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-obsidian text-white">
      <div className="mx-auto max-w-site px-site py-16 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display text-3xl italic text-white">
              LUXAFOIR
            </Link>
            <p className="mt-4 max-w-xs text-body text-white/45">
              Crafted for the Distinct. Premium fashion born from Indonesian craft.
            </p>
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

          <FooterColumn title="Shop" links={FOOTER_LINKS.shop} />
          <FooterColumn title="Info" links={FOOTER_LINKS.info} />
          <FooterColumn title="Support" links={FOOTER_LINKS.support} />
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-caption uppercase tracking-wide text-white/45">
            © 2026 LUXAFOIR. All rights reserved.
          </p>

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
