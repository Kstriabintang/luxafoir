import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Born from Indonesian craft. LUXAFOIR is a premium fashion house built on quality, sustainability, and considered design.",
};

export default function AboutPage() {
  return <AboutContent />;
}
