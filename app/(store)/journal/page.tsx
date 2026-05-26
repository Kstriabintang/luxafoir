import type { Metadata } from "next";
import { JournalView } from "@/components/journal/JournalView";
import { JOURNAL_ARTICLES } from "@/lib/journal-data";

export const metadata: Metadata = {
  title: "Journal",
  description: "Stories, collections, and the craft behind LUXAFOIR.",
};

export default function JournalPage() {
  return (
    <div className="pb-16 pt-16 md:pt-24">
      <JournalView articles={JOURNAL_ARTICLES} />
    </div>
  );
}
