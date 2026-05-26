import type { Metadata } from "next";
import { ContactView } from "@/components/contact/ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with LUXAFOIR — WhatsApp, email, and studio in Pontianak, Indonesia.",
};

export default function ContactPage() {
  return <ContactView />;
}
