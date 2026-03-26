import { createClient } from "npm:@blinkdotnew/sdk";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, content-type",
};

async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const projectId = Deno.env.get("BLINK_PROJECT_ID");
    const secretKey = Deno.env.get("BLINK_SECRET_KEY");
    if (!projectId || !secretKey) {
      return new Response(JSON.stringify({ error: "Missing config" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const blink = createClient({ projectId, secretKey });
    const { essay, prompt } = await req.json();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000);

    const result = await blink.ai.generateText({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: `You are an experienced IB TOK examiner. Grade the following TOK essay using the official IB TOK assessment criteria. Provide:

1. **Overall Score**: X/10
2. **Understanding of Knowledge Issues**: How well the student identifies and explores knowledge questions
3. **Quality of Analysis**: Depth of reasoning, use of examples, consideration of perspectives  
4. **Structure & Coherence**: Organization, flow, and clarity of argument
5. **Use of TOK Concepts**: Integration of areas of knowledge and ways of knowing
6. **Specific Strengths**: What the student did well
7. **Areas for Improvement**: Specific, actionable suggestions
8. **Key Recommendations**: 2-3 concrete steps to improve

Be encouraging but honest. Provide specific references to parts of the essay.`,
        },
        {
          role: "user",
          content: `${prompt ? `TOK Prompt: "${prompt}"\n\n` : ""}Essay:\n${essay}`,
        },
      ],
    });

    clearTimeout(timeout);
    const feedback = result.text || "Unable to generate feedback.";

    return new Response(JSON.stringify({ feedback }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("grade-tok-essay error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

Deno.serve(handler);
