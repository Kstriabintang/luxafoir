import { PageTransition } from "@/components/ui/PageTransition";

export default function StoreTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
