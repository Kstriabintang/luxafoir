import type { Metadata } from "next";
import { PageHeader } from "@/components/shop/PageHeader";
import { JournalView } from "@/components/journal/JournalView";
import { JOURNAL_ARTICLES } from "@/lib/journal-data";

export const metadata: Metadata = {
  title: "Journal",
  description: "Stories, collections, and the craft behind LUXAFOIR.",
};

export default function JournalPage() {
  return (
    <div className="pb-16">
      <PageHeader
        eyebrow="The Journal"
        title="Stories & Craft"
        description="Dispatches from the studio — collections, process, and the people behind the pieces."
      />
      <div className="mt-8">
        <JournalView articles={JOURNAL_ARTICLES} />
      </div>
    </div>
  );
}
