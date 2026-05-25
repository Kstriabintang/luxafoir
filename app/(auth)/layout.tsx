import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-site py-16">
      <div className="grain pointer-events-none absolute inset-0" />
      <Link
        href="/"
        className="relative font-display text-3xl italic text-ivory transition-colors hover:text-gold"
      >
        LUXAFOIR
      </Link>
      <div className="relative mt-12 w-full max-w-sm">{children}</div>
      <Link
        href="/"
        className="relative mt-12 text-label uppercase tracking-label text-smoke transition-colors hover:text-ivory"
      >
        ← Back to Store
      </Link>
    </div>
  );
}
