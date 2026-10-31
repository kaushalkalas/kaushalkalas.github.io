/* Cloudflare Worker — hides the Groq API key from the client.
   The portfolio site calls this worker; the worker calls Groq with
   the key stored as a Worker secret (env.GROQ_API_KEY). */

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

function isAllowed(origin, env) {
  if (!env.ALLOWED_ORIGIN) return true;
  return env.ALLOWED_ORIGIN.split(",")
    .map(function (o) {
      return o.trim();
    })
    .indexOf(origin) !== -1;
}

function corsHeaders(request, env) {
  const origin = request.headers.get("Origin") || "";
  const allowed = env.ALLOWED_ORIGIN || "";
  const allowOrigin = isAllowed(origin, env) ? origin : allowed;
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "method not allowed" }), {
        status: 405,
        headers: corsHeaders(request, env)
      });
    }

    const origin = request.headers.get("Origin") || "";
    if (!isAllowed(origin, env)) {
      return new Response(JSON.stringify({ error: "origin not allowed" }), {
        status: 403,
        headers: corsHeaders(request, env)
      });
    }

    if (!env.GROQ_API_KEY) {
      return new Response(JSON.stringify({ error: "server not configured" }), {
        status: 500,
        headers: corsHeaders(request, env)
      });
    }

    // Validate request body
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "invalid JSON" }), {
        status: 400,
        headers: corsHeaders(request, env)
      });
    }

    // Validate required fields
    if (!body.messages || !Array.isArray(body.messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), {
        status: 400,
        headers: corsHeaders(request, env)
      });
    }

    // Validate each message has required fields
    for (const msg of body.messages) {
      if (!msg.role || !msg.content) {
        return new Response(JSON.stringify({ error: "each message must have role and content" }), {
          status: 400,
          headers: corsHeaders(request, env)
        });
      }
      if (typeof msg.role !== "string" || typeof msg.content !== "string") {
        return new Response(JSON.stringify({ error: "role and content must be strings" }), {
          status: 400,
          headers: corsHeaders(request, env)
        });
      }
    }

    const upstream = await fetch(GROQ_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + env.GROQ_API_KEY
      },
      body: JSON.stringify(body)
    });

    return new Response(await upstream.text(), {
      status: upstream.status,
      headers: corsHeaders(request, env)
    });
  }
};
