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

  // Sections
  html = html.replace(/^### (.*)/gm, '<h3 class="text-lg font-bold mt-12 mb-4 border-b-2 border-primary/20 pb-2 uppercase tracking-wide text-primary/80">$1</h3>');
  html = html.replace(/^## (.*)/gm, '<h2 class="text-2xl font-black mt-16 mb-6 border-b-4 border-primary pb-2 uppercase tracking-tight">$1</h2>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Question numbers (1., 2. etc)
  html = html.replace(/^(\d+)\.\s/gm, '<div class="mt-10 first:mt-4 group"><div class="flex items-baseline gap-4"><span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-black text-sm">$1</span><div class="flex-grow font-semibold text-lg">');
  
  // Close the question div if next line starts or end of string
  // This is a bit tricky with simple regex, but let's try to wrap it better
  
  // Marks in brackets [X] or [X marks]
  html = html.replace(/\[(\d+)\]/g, '<span class="inline-flex items-center justify-center min-w-[24px] px-1.5 py-0.5 rounded border border-primary/30 bg-primary/5 text-[10px] font-bold text-primary ml-2 align-middle">[$1]</span>');
  html = html.replace(/\[(\d+)\s*marks?\]/gi, '<span class="inline-flex items-center justify-center min-w-[24px] px-1.5 py-0.5 rounded border border-primary/30 bg-primary/5 text-[10px] font-bold text-primary ml-2 align-middle">[$1]</span>');

  // Sub-questions (a), (b)
  html = html.replace(/^\(([a-z])\)\s/gm, '</div></div><div class="ml-12 mt-6 flex items-baseline gap-3"><span class="flex-shrink-0 font-bold text-primary italic">($1)</span> <div class="flex-grow">');
  
  // Sub-sub-questions (i), (ii)
  html = html.replace(/^\(([ivx]+)\)\s/gm, '</div><div class="ml-12 mt-4 flex items-baseline gap-3"><span class="flex-shrink-0 font-medium text-muted-foreground">($1)</span> <div class="flex-grow text-sm">');

  // Diagrams/Graph placeholders
  html = html.replace(/\[(DIAGRAM|GRAPH):?\s*(.*?)\]/gi, '<div class="my-8 p-12 border-2 border-dashed border-primary/20 rounded-2xl text-center bg-primary/5 group-hover:bg-primary/10 transition-colors"><div class="flex flex-col items-center gap-3"><svg class="w-12 h-12 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg><p class="text-xs font-bold uppercase tracking-widest text-primary/60">$1: $2</p></div></div>');

  // Clean up line breaks
  html = html.replace(/\n\n/g, '</div><div class="mt-4">');
  html = html.replace(/\n/g, '<br/>');

  return `<div class="paper-content-container">${html}</div>`;
}
