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
    const { subject, mode, topics, difficulty } = await req.json();

    const difficultyDesc = {
      easy: "straightforward recall and application questions",
      medium: "moderate analysis and application questions requiring some problem-solving",
      hard: "challenging questions requiring deep analysis, evaluation, and multi-step problem solving",
    }[difficulty as string] || "medium difficulty questions";

    const modePrompt = mode === "past-paper"
      ? `Generate a high-quality, premium IB-style practice exam paper for ${subject}.

STRUCTURE:
- Clear title at the top: Subject, Level, Topic, and Paper number
- Time allowed and total marks under the title
- Separated into clearly labeled sections: Section A (short answer, ~40 marks) and Section B (extended response, ~40 marks)
- Number all questions clearly (1, 2, 3...) and sub-parts as (a), (b), then (i), (ii) for further parts

QUESTION DESIGN:
- Questions must feel authentic to real IB exams
- Progress from easier to harder within each question
- Include a mix of short-response and extended-response questions
- Include mark allocations at the end of each question part in [X] format (e.g., [2], [5])
- Total marks approximately 80 marks, 8-10 questions across sections
- For math/science: include equations and multi-step calculations
- Use [DIAGRAM: description] placeholder where diagrams would appear

FORMATTING:
- Use ## for section headers (## SECTION A)
- Use ### for question sub-headings if needed
- Use $ for inline math and $$ for display math (LaTeX notation)
- Use proper LaTeX fractions like \\frac{a}{b}
- Avoid dense paragraphs — break text into readable chunks`
      : `Generate a quick quiz with 10 multiple-choice questions for ${subject}. Each question should have 4 options (A-D). Format each question clearly numbered 1-10.`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000);

    const result = await blink.ai.generateText({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: `You are an expert IB examiner with 15+ years of experience setting IB examination papers. Generate authentic IB examination content that exactly matches the style, rigor, tone, and format of real IB papers. Use proper academic language and precise formatting.`,
        },
        {
          role: "user",
          content: `${modePrompt}\n\nSubject: ${subject}\nTopics to focus on: ${topics.join(", ")}\nDifficulty: ${difficultyDesc}\n\nIMPORTANT: Output only the exam paper content — no explanations, no answers, no preamble.`,
        },
      ],
    });

    clearTimeout(timeout);
    const paper = result.text || "Failed to generate paper content.";

    return new Response(JSON.stringify({ paper }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-paper error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}

Deno.serve(handler);
