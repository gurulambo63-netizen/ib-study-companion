import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
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
      ? `You are generating an IB examination paper. Output ONLY the questions in clean markdown. Do NOT include any title, header, time, marks total, or instructions — those are added by the app.

FORMAT RULES (follow exactly):
- Use "## Section A" and "## Section B" for section headers (only these two levels)
- Number questions as "1. ", "2. ", etc. at the START of a line
- Sub-parts on their OWN line: "(a) ", "(b) ", "(c) "
- Sub-sub-parts on their OWN line: "(i) ", "(ii) ", "(iii) "
- Mark allocation at the END of each part: [2], [4], [6] — just the number in brackets
- Leave a blank line between every question, every sub-part
- Use $...$ for inline math and $$...$$ for display math (LaTeX)
- Use \\frac{a}{b} for fractions, x^{2} for powers, \\sqrt{x} for roots
- Use \\int, \\sum, \\lim, \\sin, \\cos, \\tan, \\log, \\ln for functions
- For diagrams write [DIAGRAM: precise description] on its own line
- For graphs write [GRAPH: precise description] on its own line
- Do NOT use bold (**) in question text
- Do NOT use bullet points or lists inside questions
- Each question should have 2-4 sub-parts progressing in difficulty
- Total paper should have 6-8 questions

EXAMPLE FORMAT:
## Section A

1. Consider the function $f(x) = 2x^3 - 5x + 1$.

(a) Find $f'(x)$. [2]

(b) Determine the coordinates of any stationary points. [4]

(c) Classify each stationary point as a local maximum or minimum. Justify your answer. [3]

## Section B

5. A particle moves along a straight line with velocity $v(t) = 3t^2 - 12t + 9$ m/s.

(a) Find the acceleration of the particle at time $t = 2$ seconds. [3]

(b) Calculate the total distance travelled by the particle in the first 4 seconds. [5]

[DIAGRAM: A velocity-time graph showing v(t) = 3t^2 - 12t + 9 for 0 ≤ t ≤ 4]

(c) Determine when the particle changes direction. [3]`
      : `Generate a quiz with exactly 10 multiple-choice questions for ${subject}. Format each as:

1. Question text here

A) Option one
B) Option two
C) Option three
D) Option four

**Answer: B**

---

Use $...$ for any math. Leave blank lines between questions. Use --- between questions.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a senior IB examiner with 20 years of experience writing official IB examination papers. You write questions that are rigorous, clear, and perfectly formatted. You never use vague language. Every question tests specific skills from the IB syllabus. Your mathematical notation is always precise LaTeX.`,
          },
          {
            role: "user",
            content: `${modePrompt}

Subject: ${subject}
Topics: ${topics.join(", ")}
Difficulty: ${difficultyDesc}

Generate the paper now. Output ONLY the question content, no preamble or commentary.`,
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
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please check your plan." }), {
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
