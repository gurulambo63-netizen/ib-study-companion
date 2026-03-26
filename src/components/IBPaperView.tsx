import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { PaperMode } from "@/lib/ib-data";

interface IBPaperViewProps {
  content: string;
  subject: string;
  mode: PaperMode;
}

export function IBPaperView({ content, subject, mode }: IBPaperViewProps) {
  const paperRef = useRef<HTMLDivElement>(null);
  const [renderReady, setRenderReady] = useState(false);

  useEffect(() => {
    if (!paperRef.current) return;
    // Render KaTeX equations
    const renderKatex = async () => {
      try {
        const katex = await import("katex");
        await import("katex/dist/katex.min.css");
        const el = paperRef.current;
        if (!el) return;
        const html = el.innerHTML;
        // Replace $$...$$ (display) and $...$ (inline)
        let processed = html.replace(/\$\$(.*?)\$\$/g, (_match, tex) => {
          try {
            return katex.default.renderToString(tex, { displayMode: true, throwOnError: false });
          } catch { return tex; }
        });
        processed = processed.replace(/\$(.*?)\$/g, (_match, tex) => {
          try {
            return katex.default.renderToString(tex, { displayMode: false, throwOnError: false });
          } catch { return tex; }
        });
        el.innerHTML = processed;
        setRenderReady(true);
      } catch (e) {
        console.error("KaTeX render error:", e);
        setRenderReady(true);
      }
    };
    renderKatex();
  }, [content]);

  const handleDownloadPDF = async () => {
    if (!paperRef.current) return;
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      html2pdf()
        .set({
          margin: [15, 15, 15, 15],
          filename: `${subject.replace(/\s+/g, "_")}_${mode}_paper.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(paperRef.current)
        .save();
    } catch (e) {
      console.error("PDF generation error:", e);
    }
  };

  const year = new Date().getFullYear();
  const month = new Date().toLocaleString("en", { month: "long" });
  const session = new Date().getMonth() < 6 ? "May" : "November";

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handleDownloadPDF} size="lg" className="gap-2">
          <Download className="h-5 w-5" /> Download as PDF
        </Button>
      </div>

      <div
        ref={paperRef}
        className="bg-background border border-border rounded-lg p-8 lg:p-12 max-w-3xl mx-auto shadow-sm"
        style={{ fontFamily: "'Inter', 'Times New Roman', serif", lineHeight: 1.6 }}
      >
        {mode === "past-paper" ? (
          <>
            <div className="ib-paper-header">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-1">International Baccalaureate</p>
              <h1 className="text-xl font-bold mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>{subject}</h1>
              <p className="text-sm text-muted-foreground">{session} {year} Examination</p>
              <div className="flex justify-between text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                <span>Paper 1</span>
                <span>2 hours</span>
                <span>Maximum marks: 110</span>
              </div>
            </div>
            <div className="mb-6 p-4 border border-border rounded bg-muted/30">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Instructions to Candidates</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                <li>Do not open this examination paper until instructed to do so.</li>
                <li>A graphic display calculator is required for this paper.</li>
                <li>Answer all questions in the spaces provided.</li>
                <li>Unless otherwise stated in the question, all numerical answers should be given exactly or correct to three significant figures.</li>
                <li>A clean copy of the mathematics formula booklet is required for this paper.</li>
              </ul>
            </div>
          </>
        ) : (
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold">{subject} — Quick Quiz</h1>
            <p className="text-sm text-muted-foreground">{month} {year}</p>
          </div>
        )}

        <div
          className="prose prose-sm max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: formatPaperContent(content) }}
        />
      </div>
    </div>
  );
}

function formatPaperContent(content: string): string {
  // Convert markdown-ish content to HTML
  let html = content;

  // Headers for sections
  html = html.replace(/^### (.*)/gm, '<h3 class="text-lg font-bold mt-8 mb-3 border-b border-border pb-1">$1</h3>');
  html = html.replace(/^## (.*)/gm, '<h2 class="text-xl font-bold mt-10 mb-4">$1</h2>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Question numbers with marks
  html = html.replace(/^(\d+)\.\s/gm, '<div class="mt-6"><span class="font-bold">$1.</span> ');

  // Marks in brackets
  html = html.replace(/\[(\d+)\s*marks?\]/gi, '<span class="float-right text-xs font-medium text-muted-foreground border border-border rounded px-2 py-0.5">[$1 marks]</span>');

  // Sub-questions
  html = html.replace(/^\(([a-z])\)\s/gm, '<div class="ml-6 mt-3"><span class="font-medium">($1)</span> ');

  // Line breaks
  html = html.replace(/\n\n/g, '</div><div class="mt-2">');
  html = html.replace(/\n/g, '<br/>');

  // Graph placeholders
  html = html.replace(/\[GRAPH:?\s*(.*?)\]/gi, '<div class="my-4 p-6 border-2 border-dashed border-border rounded-lg text-center text-muted-foreground bg-muted/20"><p class="text-sm">📊 Graph: $1</p></div>');

  return `<div>${html}</div>`;
}
