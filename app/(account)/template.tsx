import { PageTransition } from "@/components/ui/PageTransition";

export default function AccountTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
