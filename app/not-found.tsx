import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-site text-center">
      <div className="grain pointer-events-none absolute inset-0" />
      <Link href="/" className="relative font-display text-2xl italic text-ivory hover:text-gold">
        LUXAFOIR
      </Link>
      <p className="relative mt-16 font-mono text-sm tracking-widest text-gold">404</p>
      <h1 className="relative mt-4 font-display text-hero font-light leading-none text-ivory">
        Lost the thread
      </h1>
      <p className="relative mt-5 max-w-md text-body text-mist">
        The page you&apos;re looking for has moved on — much like last season&apos;s collection.
      </p>
      <div className="relative mt-10 flex flex-wrap justify-center gap-4">
        <Button asChild variant="solid" size="lg">
          <Link href="/">Back to Home</Link>
        </Button>
        <Button asChild variant="ivory" size="lg">
          <Link href="/shop">Shop the Collection</Link>
        </Button>
      </div>
    </div>
  );
}
