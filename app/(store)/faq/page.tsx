import type { Metadata } from "next";
import { FaqView } from "@/components/faq/FaqView";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about LUXAFOIR orders, shipping, sizing and returns.",
};

export default function FaqPage() {
  return <FaqView />;
}
