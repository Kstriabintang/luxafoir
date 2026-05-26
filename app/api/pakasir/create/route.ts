import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE = "https://app.pakasir.com";

/**
 * Creates a Pakasir transaction server-side (keeps the API key secret and
 * sidesteps the API's lack of browser CORS). Returns the QR string / VA number.
 */
export async function POST(req: NextRequest) {
  const project = process.env.PAKASIR_PROJECT;
  const apiKey = process.env.PAKASIR_API_KEY;
  if (!project || !apiKey) {
    return NextResponse.json({ error: "Pakasir is not configured." }, { status: 500 });
  }

  let body: { order_id?: string; amount?: number; method?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { order_id, amount, method } = body;
  if (!order_id || !amount || !method) {
    return NextResponse.json({ error: "Missing order_id, amount, or method." }, { status: 400 });
  }

  const res = await fetch(`${BASE}/api/transactioncreate/${encodeURIComponent(method)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project, order_id, amount, api_key: apiKey }),
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.payment) {
    return NextResponse.json(
      { error: "Failed to create transaction.", detail: data },
      { status: res.status || 502 }
    );
  }
  return NextResponse.json({ payment: data.payment });
}
