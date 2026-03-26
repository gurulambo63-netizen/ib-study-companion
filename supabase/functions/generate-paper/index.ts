import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { subject, mode, topics, difficulty } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const difficultyDesc = {
      easy: "straightforward recall and application questions",
      medium: "moderate analysis and application questions requiring some problem-solving",
      hard: "challenging questions requiring deep analysis, evaluation, and multi-step problem solving",
    }[difficulty] || "medium difficulty questions";

    const modePrompt = mode === "past-paper"
      ? `Generate a full IB-style exam paper for ${subject}. Format it exactly like a real IB exam paper with proper sections.
Include:
- Section A: Multiple choice or short answer questions (if applicable)
- Section B: Extended response questions
- Each question should show marks in [X marks] format
- Use proper mathematical notation with $ for inline and $$ for display equations
- Include realistic data, scenarios, and contexts
- Total marks should be around 80-110
- Include approximately 8-12 questions across sections
- For math/science, include equations and calculations
- Use [GRAPH: description] placeholder where graphs would appear`
      : `Generate a quick quiz with 10 multiple-choice questions for ${subject}. Each question should have 4 options (A-D) with the correct answer marked.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: `You are an expert IB examiner. Generate authentic IB examination content that matches the style, rigor, and format of real IB papers. Use proper academic language and formatting.`,
          },
          {
            role: "user",
            content: `${modePrompt}

Topics to focus on: ${topics.join(", ")}
Difficulty: ${difficultyDesc}

Important formatting rules:
- Use $ for inline math and $$ for display math (LaTeX notation)
- Use proper fraction notation like \\frac{a}{b}, not text fractions
- Use [X marks] at the end of each question to show marks
- Use ## for section headers and ### for sub-sections
- For graphs use [GRAPH: description of what should be shown]`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${status}`);
    }

    const data = await response.json();
    const paper = data.choices?.[0]?.message?.content || "Failed to generate paper content.";

    return new Response(JSON.stringify({ paper }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-paper error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
