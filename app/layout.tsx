import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://luxafoir.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LUXAFOIR — Crafted for the Distinct",
    template: "%s · LUXAFOIR",
  },
  description:
    "LUXAFOIR is a premium Indonesian fashion house. Dark luxury, editorial minimalism, and cinematic craft — designed for the distinct.",
  keywords: [
    "LUXAFOIR",
    "luxury fashion",
    "Indonesian fashion",
    "streetwear",
    "editorial fashion",
    "premium clothing",
  ],
  authors: [{ name: "LUXAFOIR" }],
  openGraph: {
    type: "website",
    locale: "en_ID",
    url: SITE_URL,
    siteName: "LUXAFOIR",
    title: "LUXAFOIR — Crafted for the Distinct",
    description:
      "Premium Indonesian fashion. Dark luxury, editorial minimalism, cinematic craft.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUXAFOIR — Crafted for the Distinct",
    description: "Premium Indonesian fashion. Crafted for the distinct.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LUXAFOIR",
    url: SITE_URL,
    description:
      "Premium Indonesian fashion house. Crafted for the Distinct.",
    slogan: "Crafted for the Distinct",
    sameAs: [
      "https://instagram.com",
      "https://tiktok.com",
      "https://pinterest.com",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white font-body text-[#0A0A0A] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast:
                "!bg-white !border !border-ash !text-[#0A0A0A] !rounded-none !font-body !shadow-lg",
              title: "!text-[#0A0A0A] !text-sm",
              description: "!text-smoke",
            },
          }}
        />
      </body>
    </html>
  );
}
