"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Package, Heart, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Dashboard", href: "/account", icon: LayoutGrid },
  { label: "Orders", href: "/account/orders", icon: Package },
  { label: "Wishlist", href: "/account/wishlist", icon: Heart },
  { label: "Settings", href: "/account/settings", icon: Settings },
];

export function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row gap-1 overflow-x-auto border-b border-ash pb-2 md:flex-col md:border-b-0 md:pb-0">
      {LINKS.map((link) => {
        const active = pathname === link.href;
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex shrink-0 items-center gap-3 px-4 py-3 text-label uppercase tracking-label transition-colors",
              active ? "bg-void text-gold md:border-l md:border-gold" : "text-smoke hover:text-ivory"
            )}
          >
            <Icon className="size-4" strokeWidth={1.5} />
            {link.label}
          </Link>
        );
      })}
      <button className="mt-1 flex shrink-0 items-center gap-3 px-4 py-3 text-label uppercase tracking-label text-smoke transition-colors hover:text-error">
        <LogOut className="size-4" strokeWidth={1.5} />
        Sign Out
      </button>
    </nav>
  );
}
