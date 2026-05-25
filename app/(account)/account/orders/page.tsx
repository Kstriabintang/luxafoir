import Link from "next/link";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function OrdersPage() {
  // No auth session wired yet → empty state. With Supabase auth + Prisma,
  // fetch orders by the signed-in user's id/email here.
  const orders: { id: string }[] = [];

  return (
    <div>
      <h2 className="font-display text-3xl font-light text-ivory">Orders</h2>
      <p className="mt-2 text-body text-mist">Track, manage, and reorder your pieces.</p>

      {orders.length === 0 ? (
        <div className="mt-10 flex flex-col items-center border border-ash bg-void px-6 py-20 text-center">
          <Package className="size-10 text-ash" strokeWidth={1} />
          <p className="mt-6 font-display text-2xl text-ivory">No orders yet</p>
          <p className="mt-2 text-body text-smoke">When you place an order, it will appear here.</p>
          <Button asChild variant="outline" size="md" className="mt-8">
            <Link href="/shop">Shop the Collection</Link>
          </Button>
        </div>
      ) : null}
    </div>
  );
}
