"use client";

import Link from "next/link";
import { Package, Heart, Settings, ArrowRight } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";

export default function AccountDashboard() {
  const { count } = useWishlist();

  const cards = [
    { label: "Orders", value: "0", hint: "Track & reorder", href: "/account/orders", icon: Package },
    { label: "Wishlist", value: String(count), hint: "Saved pieces", href: "/account/wishlist", icon: Heart },
    { label: "Settings", value: "", hint: "Profile & preferences", href: "/account/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-label uppercase tracking-label text-gold">Welcome back</p>
        <h2 className="mt-3 font-display text-3xl font-light text-ivory">Your LUXAFOIR</h2>
        <p className="mt-2 text-body text-mist">
          Manage your orders, saved pieces, and details — all in one place.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px sm:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="group flex flex-col justify-between border border-ash bg-void p-6 transition-colors hover:border-gold"
            >
              <div className="flex items-start justify-between">
                <Icon className="size-5 text-gold" strokeWidth={1.5} />
                <ArrowRight className="size-4 text-smoke transition-all group-hover:translate-x-1 group-hover:text-gold" />
              </div>
              <div className="mt-10">
                {c.value !== "" && (
                  <p className="font-mono text-3xl text-ivory">{c.value}</p>
                )}
                <p className="mt-1 text-label uppercase tracking-label text-ivory">{c.label}</p>
                <p className="mt-1 text-caption text-smoke">{c.hint}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="border border-ash bg-void p-8 text-center">
        <p className="text-body text-mist">No recent activity yet.</p>
        <Link
          href="/shop"
          className="link-underline mt-3 inline-block text-label uppercase tracking-label text-gold"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
