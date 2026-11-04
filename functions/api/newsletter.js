export async function onRequestPost({ request, env }) {
  const headers = { "Content-Type": "application/json", "Cache-Control": "no-store" };
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    if (email.length > 254 || !/^\S+@\S+\.\S+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Enter a valid email address." }), { status: 400, headers });
    }
    if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(JSON.stringify({ error: "Newsletter service is not configured yet." }), { status: 503, headers });
    }
    const response = await fetch(env.SUPABASE_URL.replace(/\/$/, "") + "/rest/v1/newsletter_subscribers", {
      method: "POST",
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: "Bearer " + env.SUPABASE_SERVICE_ROLE_KEY,
        "Content-Type": "application/json",
        Prefer: "resolution=ignore-duplicates,return=minimal"
      },
      body: JSON.stringify({ email, source: "website" })
    });
    if (!response.ok) {
      console.error("Supabase newsletter insert failed:", response.status);
      return new Response(JSON.stringify({ error: "Subscription failed. Please try again later." }), { status: 502, headers });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 201, headers });
  } catch (error) {
    console.error("Newsletter endpoint error:", error);
    return new Response(JSON.stringify({ error: "Invalid request or temporary server error." }), { status: 400, headers });
  }
}
export async function onRequest(context) {
  return new Response(JSON.stringify({ error: "Method not allowed." }), {
    status: 405, headers: { "Content-Type": "application/json", Allow: "POST", "Cache-Control": "no-store" }
  });
}