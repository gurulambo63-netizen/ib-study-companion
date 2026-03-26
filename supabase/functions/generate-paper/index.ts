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
      ? `Generate a high-quality IB-style practice paper that is visually clean, well-structured, and aesthetically professional.
    
    STRUCTURE:
    - Include a clear title at the top: Subject, Level, Topic, and Paper number
    - Add time allowed and total marks under the title
    - Separate the paper into clearly labeled sections (e.g., Section A, Section B)
    - Number all questions clearly (1, 2, 3...) and sub-parts (a), (b), (i), (ii)
    
    LAYOUT & SPACING:
    - Use consistent spacing between questions
    - Ensure each question is visually separated
    - Align all text neatly
    - Keep margins clean and balanced
    
    TYPOGRAPHY STYLE:
    - Use simple, readable formatting
    - Use bold ONLY for headings
    - Use italics only where appropriate (e.g., variables, emphasis)
    - Mathematical expressions must be clearly formatted using LaTeX ($ for inline, $$ for display)
    
    QUESTION DESIGN:
    - Questions must feel authentic to IB exams
    - Progress from easier to harder within each question
    - Include a mix of short-response and extended-response questions
    - Include mark allocations at the end of each question part in [X] format (e.g., [2], [5])
    
    VISUAL CLARITY:
    - Avoid dense paragraphs — break text into readable chunks
    - Use indentation for sub-parts
    - If diagrams are needed, use [DIAGRAM: description] placeholders
    
    QUALITY:
    - No vague or generic questions
    - Ensure questions test real understanding, not just recall
    - Maintain consistency in tone and difficulty`
      : `Generate a quick quiz with 10 multiple-choice questions for ${subject}. Each question should have 4 options (A-D) with the correct answer marked clearly.`;
    
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
