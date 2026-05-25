import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Footer } from "@/components/layout/Footer";
import { Overlays } from "@/components/layout/Overlays";
import { BackToTop } from "@/components/ui/BackToTop";

/**
 * The full storefront chrome: promo bar, navbar, mobile menu, footer, plus the
 * code-split global overlays (cart drawer, search, quick view, newsletter popup).
 * Shared by the (store) and (account) route groups.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <MobileMenu />
      <main className="min-h-screen">{children}</main>
      <Footer />

      <Overlays />
      <BackToTop />
    </>
  );
}
