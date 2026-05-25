"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-site text-center">
      <div className="grain pointer-events-none absolute inset-0" />
      <Link href="/" className="relative font-display text-2xl italic text-ivory hover:text-gold">
        LUXAFOIR
      </Link>
      <h1 className="relative mt-16 font-display text-h1 font-light text-ivory">
        Something went wrong
      </h1>
      <p className="relative mt-5 max-w-md text-body text-mist">
        An unexpected error occurred. Please try again — if it persists, return home.
      </p>
      <div className="relative mt-10 flex flex-wrap justify-center gap-4">
        <Button variant="solid" size="lg" onClick={reset}>
          Try Again
        </Button>
        <Button asChild variant="ivory" size="lg">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
