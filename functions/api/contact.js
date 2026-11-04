export async function onRequestPost({ request, env }) {
  const headers = { "Content-Type": "application/json", "Cache-Control": "no-store" };
  try {
    const body = await request.json();
    if (typeof body.website === "string" && body.website.trim()) {
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
    }
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const company = String(body.company || "").trim();
    const topic = String(body.topic || "General enquiry").trim();
    const message = String(body.message || "").trim();
    if (name.length < 2 || name.length > 100 || email.length > 254 ||
        !/^\S+@\S+\.\S+$/.test(email) || company.length > 120 ||
        topic.length > 80 || message.length < 10 || message.length > 5000) {
      return new Response(JSON.stringify({ error: "Please check the form fields." }), { status: 400, headers });
    }
    if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
      return new Response(JSON.stringify({ error: "Contact service is not configured yet." }), { status: 503, headers });
    }
    const response = await fetch(env.SUPABASE_URL.replace(/\/$/, "") + "/rest/v1/contact_submissions", {
      method: "POST",
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: "Bearer " + env.SUPABASE_SERVICE_ROLE_KEY,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify({ name, email, company: company || null, topic, message, source: "website" })
    });
    if (!response.ok) {
      console.error("Supabase contact insert failed:", response.status);
      return new Response(JSON.stringify({ error: "We could not save your enquiry. Please email us directly." }), { status: 502, headers });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 201, headers });
  } catch (error) {
    console.error("Contact endpoint error:", error);
    return new Response(JSON.stringify({ error: "Invalid request or temporary server error." }), { status: 400, headers });
  }
}
export async function onRequest(context) {
  return new Response(JSON.stringify({ error: "Method not allowed." }), {
    status: 405, headers: { "Content-Type": "application/json", Allow: "POST", "Cache-Control": "no-store" }
  });
}