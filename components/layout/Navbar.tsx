"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, Heart, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { useUIStore } from "@/stores/ui.store";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useTranslation } from "@/components/i18n/LanguageProvider";

/** Clean "ID / EN" text toggle (no flags). Inverts to white over a dark hero. */
function LangToggle({ onDark }: { onDark?: boolean }) {
  const { lang, setLang } = useTranslation();
  const active = onDark ? "text-white" : "text-obsidian";
  const inactive = onDark ? "text-white/60 hover:text-white" : "text-smoke hover:text-obsidian";

  return (
    <div className="ml-1 flex items-center gap-1.5 text-[12px] uppercase tracking-[0.12em] md:text-[11px]">
      <button
        onClick={() => setLang("id")}
        aria-label="Bahasa Indonesia"
        aria-pressed={lang === "id"}
        className={cn("py-2 transition-colors", lang === "id" ? active : inactive)}
      >
        ID
      </button>
      <span aria-hidden className={onDark ? "text-white/40" : "text-ash"}>
        /
      </span>
      <button
        onClick={() => setLang("en")}
        aria-label="English"
        aria-pressed={lang === "en"}
        className={cn("py-2 transition-colors", lang === "en" ? active : inactive)}
      >
        EN
      </button>
    </div>
  );
}

function CountBadge({ count }: { count: number }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
          className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 font-mono text-[10px] font-medium text-obsidian"
        >
          {count}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const openCart = useUIStore((s) => s.openCart);
  const openSearch = useUIStore((s) => s.openSearch);
  const toggleMobileMenu = useUIStore((s) => s.toggleMobileMenu);

  const { summary } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Only the homepage has a full-bleed dark hero behind the navbar. While the
  // user is parked over it (scroll ≈ 0), the header floats transparent with
  // white content; once they scroll it settles into the solid white bar.
  const isHome = pathname === "/";
  const onDark = isHome && !scrolled;

  const iconCls = onDark
    ? "text-white hover:text-white/70"
    : "text-ivory hover:text-gold";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-500 ease-out-expo",
        onDark
          ? "border-b border-transparent bg-transparent"
          : "border-b border-[#E5E2DC] bg-white/90 backdrop-blur-xl",
        scrolled && !onDark && "shadow-[0_1px_0_rgba(0,0,0,0.04)]"
      )}
    >
      <nav className="mx-auto grid h-[var(--nav-h-mobile)] max-w-site grid-cols-[1fr_auto_1fr] items-center px-site md:h-[var(--nav-h)]">
        {/* LEFT — hamburger (mobile) / logo (desktop) */}
        <div className="flex items-center justify-start">
          <button
            onClick={toggleMobileMenu}
            aria-label="Open menu"
            className={cn("-ml-2 p-2 transition-colors md:hidden", iconCls)}
          >
            <Menu className="size-5" strokeWidth={1.5} />
          </button>
          <Link
            href="/"
            className={cn(
              "hidden font-display text-[28px] font-bold italic leading-none tracking-tight transition-colors md:block",
              onDark ? "text-white hover:text-white/80" : "text-ivory hover:text-gold"
            )}
          >
            LUXAFOIR
          </Link>
        </div>

        {/* CENTER — nav (desktop) / logo (mobile) */}
        <div className="flex items-center justify-center">
          {/* Mobile: brand lockup. Black artwork, so invert to white over the hero. */}
          <Link href="/" aria-label="LUXAFOIR — Home" className="md:hidden">
            <Image
              src="/logo.png"
              alt="LUXAFOIR"
              width={184}
              height={217}
              priority
              className={cn(
                "h-10 w-auto transition-[filter] duration-500",
                onDark && "brightness-0 invert"
              )}
            />
          </Link>
          <ul className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-active={isActive(link.href)}
                  className={cn(
                    "link-underline text-label uppercase tracking-label transition-colors data-[active=true]:text-gold",
                    onDark
                      ? "text-white/85 hover:text-white"
                      : "text-ivory/90 hover:text-ivory"
                  )}
                >
                  {t(link.tKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — icons (roomier spacing on mobile) */}
        <div className="flex items-center justify-end gap-2 md:gap-3">
          <button
            onClick={openSearch}
            aria-label="Search"
            className={cn("p-2 transition-colors", iconCls)}
          >
            <Search className="size-5" strokeWidth={1.5} />
          </button>
          <Link
            href="/account/wishlist"
            aria-label="Wishlist"
            className={cn("relative hidden p-2 transition-colors md:block", iconCls)}
          >
            <Heart className="size-5" strokeWidth={1.5} />
            <CountBadge count={wishlistCount} />
          </Link>
          <button
            onClick={openCart}
            aria-label="Open cart"
            className={cn("relative p-2 transition-colors", iconCls)}
          >
            <ShoppingBag className="size-5" strokeWidth={1.5} />
            <CountBadge count={summary.itemCount} />
          </button>
          <LangToggle onDark={onDark} />
        </div>
      </nav>
    </header>
  );
}
