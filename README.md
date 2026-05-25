# LUXAFOIR

> Crafted for the Distinct — a premium Indonesian streetwear e-commerce experience.

Clean, white, editorial design. Built as a production-grade storefront with
conversion-optimised UX: slide-out cart, quick view, wishlist, infinite scroll,
real-time search, multi-step checkout, and a Midtrans payment flow.

**Live demo:** _deploy to Vercel and add your URL here_ · **Stack:** Next.js 14 · TypeScript · Tailwind · Framer Motion · Prisma · Supabase

## Tech Stack

| | |
|---|---|
| Framework | Next.js 14 (App Router, RSC) + TypeScript |
| Styling | Tailwind CSS v3 (custom design system) |
| Animation | Framer Motion v11 |
| UI primitives | Radix UI (shadcn-style) |
| Database | Supabase (PostgreSQL) via Prisma 6 |
| Storage | Supabase Storage |
| Payments | Midtrans (Snap.js) |
| Email | Resend + React Email |
| State | Zustand (cart, wishlist, UI) |
| Forms | React Hook Form + Zod |
| Icons / Fonts | Lucide · Cormorant Garamond + DM Sans + DM Mono |

## Getting Started

```bash
npm install
cp .env.example .env      # fill in your keys
npm run prisma:generate   # generate the Prisma client
npm run dev               # http://localhost:3000
```

The app runs fully on **mock data** (`lib/mock-data.ts`) with **no env keys** —
payments simulate success, and DB/email calls degrade gracefully. Wire real
services by populating `.env`.

### Database

```bash
npm run prisma:push   # push schema to Supabase Postgres
npm run db:seed       # seed categories, collections & products
```

## Scripts

| Script | Description |
|---|---|
| `dev` / `build` / `start` | Next.js dev / production build / serve |
| `lint` | ESLint |
| `prisma:generate` | Generate Prisma client |
| `prisma:push` | Push schema to the database |
| `db:seed` | Seed the catalogue |

## Project Structure

```
app/
  (store)/      Storefront: home, shop, product, cart, checkout, collections, journal, about, search
  (account)/    Account dashboard, orders, wishlist, settings
  (auth)/       Login, register
  api/          newsletter, payment/midtrans (+ notification webhook)
components/     layout · home · product · cart · shop · checkout · journal · account · ui · shared
lib/            supabase · prisma · midtrans · resend · emails · utils · constants · mock-data
stores/         Zustand: cart · wishlist · ui
hooks/          useCart · useWishlist · useRecentlyViewed · useIntersection · useHydrated
prisma/         schema.prisma · seed.ts
emails/         React Email templates
types/          product · cart · order
```

## Design System

CSS tokens live in `app/globals.css`; Tailwind maps them in `tailwind.config.ts`.
Obsidian/void/charcoal surfaces, ivory text, a restrained gold accent, and the
signature staggered fade-up motion (`--ease-out-expo`).

---

© 2026 LUXAFOIR. All rights reserved.
