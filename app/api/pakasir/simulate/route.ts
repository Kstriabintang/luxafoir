import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BASE = "https://app.pakasir.com";

/**
 * Sandbox-only: simulates a successful payment so the webhook/status flow can
 * be tested without a real transfer. Disabled in production mode.
 */
export async function POST(req: NextRequest) {
  if (process.env.PAKASIR_MODE === "production") {
    return NextResponse.json({ error: "Simulation is disabled in production." }, { status: 403 });
  }

  const project = process.env.PAKASIR_PROJECT;
  const apiKey = process.env.PAKASIR_API_KEY;
  if (!project || !apiKey) {
    return NextResponse.json({ error: "Pakasir is not configured." }, { status: 500 });
  }

  let body: { order_id?: string; amount?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { order_id, amount } = body;
  if (!order_id || !amount) {
    return NextResponse.json({ error: "Missing order_id or amount." }, { status: 400 });
  }

  const res = await fetch(`${BASE}/api/paymentsimulation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project, order_id, amount, api_key: apiKey }),
    cache: "no-store",
  });
  const data = await res.json().catch(() => null);
  return NextResponse.json(data ?? {}, { status: res.ok ? 200 : res.status || 502 });
}
