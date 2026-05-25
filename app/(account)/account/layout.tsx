import { AccountNav } from "@/components/account/AccountNav";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-site px-site pt-16 md:pt-24">
      <h1 className="font-display text-h1 font-light text-ivory">Account</h1>
      <div className="mt-10 grid grid-cols-1 gap-10 pb-24 md:grid-cols-[220px_1fr] md:gap-14">
        <aside className="h-fit md:sticky md:top-[calc(var(--nav-h)+24px)]">
          <AccountNav />
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
