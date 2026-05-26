// Cloudflare Pages Function — POST /api/pakasir/create
// Creates a Pakasir transaction server-side (keeps PAKASIR_API_KEY secret and
// sidesteps the API's lack of browser CORS). Returns the QR string / VA number.
const BASE = "https://app.pakasir.com";

export async function onRequestPost(context) {
  const { request, env } = context;
  const project = env.PAKASIR_PROJECT;
  const apiKey = env.PAKASIR_API_KEY;
  if (!project || !apiKey) {
    return Response.json({ error: "Pakasir is not configured." }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { order_id, amount, method } = body || {};
  if (!order_id || !amount || !method) {
    return Response.json({ error: "Missing order_id, amount, or method." }, { status: 400 });
  }

  const res = await fetch(`${BASE}/api/transactioncreate/${encodeURIComponent(method)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project, order_id, amount, api_key: apiKey }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.payment) {
    return Response.json({ error: "Failed to create transaction.", detail: data }, { status: res.status || 502 });
  }
  return Response.json({ payment: data.payment });
}
