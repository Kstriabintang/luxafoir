import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE = "https://app.pakasir.com";

/** Returns the authoritative status of a transaction (polled by the client). */
export async function GET(req: NextRequest) {
  const project = process.env.PAKASIR_PROJECT;
  const apiKey = process.env.PAKASIR_API_KEY;
  if (!project || !apiKey) {
    return NextResponse.json({ error: "Pakasir is not configured." }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("order_id");
  const amount = searchParams.get("amount");
  if (!orderId || !amount) {
    return NextResponse.json({ error: "Missing order_id or amount." }, { status: 400 });
  }

  const url =
    `${BASE}/api/transactiondetail?project=${encodeURIComponent(project)}` +
    `&amount=${encodeURIComponent(amount)}&order_id=${encodeURIComponent(orderId)}` +
    `&api_key=${encodeURIComponent(apiKey)}`;

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.transaction) {
    return NextResponse.json({ status: "pending" });
  }
  return NextResponse.json({ status: data.transaction.status, transaction: data.transaction });
}
