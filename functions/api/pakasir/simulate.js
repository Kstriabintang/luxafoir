// Cloudflare Pages Function — POST /api/pakasir/simulate
// Sandbox-only: simulates a successful payment so the status flow can be tested
// without a real transfer. Disabled when PAKASIR_MODE=production.
const BASE = "https://app.pakasir.com";

export async function onRequestPost(context) {
  const { request, env } = context;
  if (env.PAKASIR_MODE === "production") {
    return Response.json({ error: "Simulation is disabled in production." }, { status: 403 });
  }

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

  const { order_id, amount } = body || {};
  if (!order_id || !amount) {
    return Response.json({ error: "Missing order_id or amount." }, { status: 400 });
  }

  const res = await fetch(`${BASE}/api/paymentsimulation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ project, order_id, amount, api_key: apiKey }),
  });
  const data = await res.json().catch(() => ({}));
  return Response.json(data ?? {}, { status: res.ok ? 200 : res.status || 502 });
}
