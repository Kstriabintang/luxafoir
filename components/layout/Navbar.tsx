"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, Heart, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { useUIStore } from "@/stores/ui.store";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-[#E5E2DC] bg-white/90 backdrop-blur-xl transition-all duration-500 ease-out-expo",
        scrolled && "shadow-[0_1px_0_rgba(0,0,0,0.04)]"
      )}
    >
      <nav className="mx-auto grid h-[var(--nav-h-mobile)] max-w-site grid-cols-[1fr_auto_1fr] items-center px-site md:h-[var(--nav-h)]">
        {/* LEFT — hamburger (mobile) / logo (desktop) */}
        <div className="flex items-center justify-start">
          <button
            onClick={toggleMobileMenu}
            aria-label="Open menu"
            className="-ml-2 p-2 text-ivory transition-colors hover:text-gold md:hidden"
          >
            <Menu className="size-5" strokeWidth={1.5} />
          </button>
          <Link
            href="/"
            className="hidden font-display text-[28px] italic leading-none tracking-tight text-ivory transition-colors hover:text-gold md:block"
          >
            LUXAFOIR
          </Link>
        </div>

        {/* CENTER — nav (desktop) / logo (mobile) */}
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="font-display text-2xl italic leading-none tracking-tight text-ivory md:hidden"
          >
            LUXAFOIR
          </Link>
          <ul className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-active={isActive(link.href)}
                  className="link-underline text-label uppercase tracking-label text-ivory/90 transition-colors hover:text-ivory data-[active=true]:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — icons */}
        <div className="flex items-center justify-end gap-1 md:gap-3">
          <button
            onClick={openSearch}
            aria-label="Search"
            className="p-2 text-ivory transition-colors hover:text-gold"
          >
            <Search className="size-5" strokeWidth={1.5} />
          </button>
          <Link
            href="/account/wishlist"
            aria-label="Wishlist"
            className="relative hidden p-2 text-ivory transition-colors hover:text-gold md:block"
          >
            <Heart className="size-5" strokeWidth={1.5} />
            <CountBadge count={wishlistCount} />
          </Link>
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative p-2 text-ivory transition-colors hover:text-gold"
          >
            <ShoppingBag className="size-5" strokeWidth={1.5} />
            <CountBadge count={summary.itemCount} />
          </button>
        </div>
      </nav>
    </header>
  );
}
