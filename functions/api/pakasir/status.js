// Cloudflare Pages Function — GET /api/pakasir/status?order_id=&amount=
// Returns the authoritative transaction status (polled by the client).
const BASE = "https://app.pakasir.com";

export async function onRequestGet(context) {
  const { request, env } = context;
  const project = env.PAKASIR_PROJECT;
  const apiKey = env.PAKASIR_API_KEY;
  if (!project || !apiKey) {
    return Response.json({ error: "Pakasir is not configured." }, { status: 500 });
  }

  const url = new URL(request.url);
  const orderId = url.searchParams.get("order_id");
  const amount = url.searchParams.get("amount");
  if (!orderId || !amount) {
    return Response.json({ error: "Missing order_id or amount." }, { status: 400 });
  }

  const target =
    `${BASE}/api/transactiondetail?project=${encodeURIComponent(project)}` +
    `&amount=${encodeURIComponent(amount)}&order_id=${encodeURIComponent(orderId)}` +
    `&api_key=${encodeURIComponent(apiKey)}`;

  const res = await fetch(target);
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.transaction) {
    return Response.json({ status: "pending" });
  }
  return Response.json({ status: data.transaction.status, transaction: data.transaction });
}
