import { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { PaperMode } from "@/lib/ib-data";

const GENERATE_DIAGRAM_URL = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/generate-diagram`;

interface IBPaperViewProps {
  content: string;
  subject: string;
  mode: PaperMode;
}

export function IBPaperView({ content, subject, mode }: IBPaperViewProps) {
  const paperRef = useRef<HTMLDivElement>(null);
  const [diagramImages, setDiagramImages] = useState<Record<string, string>>({});
  const [loadingDiagrams, setLoadingDiagrams] = useState<Record<string, boolean>>({});

  const extractDiagramDescriptions = useCallback((text: string) => {
    const matches: { type: string; description: string; key: string }[] = [];
    const regex = /\[(DIAGRAM|GRAPH):?\s*(.*?)\]/gi;
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        type: match[1],
        description: match[2],
        key: `${match[1]}-${match[2]}`.toLowerCase().replace(/\s+/g, "-"),
      });
    }
    return matches;
  }, []);

  useEffect(() => {
    const diagrams = extractDiagramDescriptions(content);
    if (diagrams.length === 0) return;
    diagrams.forEach(async (diagram) => {
      if (diagramImages[diagram.key] || loadingDiagrams[diagram.key]) return;
      setLoadingDiagrams((prev) => ({ ...prev, [diagram.key]: true }));
      try {
        const res = await fetch(GENERATE_DIAGRAM_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description: diagram.description, type: diagram.type }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.imageUrl) {
          setDiagramImages((prev) => ({ ...prev, [diagram.key]: data.imageUrl }));
        }
      } catch (err) {
        console.error("Diagram generation error:", err);
      } finally {
        setLoadingDiagrams((prev) => ({ ...prev, [diagram.key]: false }));
      }
    });
  }, [content, extractDiagramDescriptions]);

  // KaTeX rendering
  useEffect(() => {
    if (!paperRef.current) return;
    const renderKatex = async () => {
      try {
        const katex = await import("katex");
        await import("katex/dist/katex.min.css");
        const el = paperRef.current;
        if (!el) return;
        let html = el.innerHTML;
        // Display math first ($$...$$)
        html = html.replace(/\$\$([\s\S]*?)\$\$/g, (_m, tex) => {
          try {
            return `<div class="ib-display-math">${katex.default.renderToString(tex.trim(), { displayMode: true, throwOnError: false })}</div>`;
          } catch { return tex; }
        });
        // Inline math ($...$)
        html = html.replace(/\$([^\$\n]+?)\$/g, (_m, tex) => {
          try {
            return katex.default.renderToString(tex.trim(), { displayMode: false, throwOnError: false });
          } catch { return tex; }
        });
        el.innerHTML = html;
      } catch (e) {
        console.error("KaTeX render error:", e);
      }
    };
    renderKatex();
  }, [content, diagramImages]);

  const handleDownloadPDF = async () => {
    if (!paperRef.current) return;
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      html2pdf()
        .set({
          margin: [20, 20, 20, 20],
          filename: `${subject.replace(/\s+/g, "_")}_${mode}_paper.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, logging: false },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        })
        .from(paperRef.current)
        .save();
    } catch (e) {
      console.error("PDF generation error:", e);
    }
  };

  const session = new Date().getMonth() < 6 ? "May" : "November";
  const year = new Date().getFullYear();
  const month = new Date().toLocaleString("en", { month: "long" });

  const formattedContent = formatPaperContent(content, diagramImages, loadingDiagrams);

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <Button onClick={handleDownloadPDF} size="lg" className="gap-2 shadow-sm">
          <Download className="h-5 w-5" /> Download as PDF
        </Button>
      </div>

      <div
        ref={paperRef}
        className="ib-paper-container bg-white dark:bg-zinc-950 border border-border rounded-xl max-w-[800px] mx-auto shadow-lg"
      >
        {/* Paper header */}
        {mode === "past-paper" ? (
          <div className="ib-paper-header-block">
            {/* Top band */}
            <div className="bg-zinc-900 dark:bg-zinc-800 text-white px-10 py-6 rounded-t-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.4em] opacity-70 font-medium">International Baccalaureate Organization</span>
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-50">{session} {year}</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {subject}
              </h1>
              <p className="text-sm opacity-70 mt-1">Higher Level — Paper 1</p>
            </div>

            {/* Meta row */}
            <div className="flex border-b border-border">
              <div className="flex-1 px-10 py-3 border-r border-border">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Duration</span>
                <p className="text-sm font-semibold text-foreground mt-0.5">2 hours</p>
              </div>
              <div className="flex-1 px-10 py-3 border-r border-border">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Maximum Marks</span>
                <p className="text-sm font-semibold text-foreground mt-0.5">110</p>
              </div>
              <div className="flex-1 px-10 py-3">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Candidate Session</span>
                <p className="text-sm font-semibold text-foreground mt-0.5">{session} {year}</p>
              </div>
            </div>

            {/* Instructions */}
            <div className="px-10 py-5 bg-muted/30 border-b border-border">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-3">Instructions to Candidates</p>
              <ul className="space-y-1.5">
                {[
                  "Do not open this examination paper until instructed to do so.",
                  "A graphic display calculator is required for this paper.",
                  "Answer all questions in the spaces provided.",
                  "Unless otherwise stated, all numerical answers should be given exactly or correct to three significant figures.",
                  "A clean copy of the mathematics formula booklet is required for this paper.",
                  "The maximum mark for this examination paper is 110 marks.",
                ].map((instruction, i) => (
                  <li key={i} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                    <span className="text-muted-foreground/50 flex-shrink-0">•</span>
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="px-10 py-8 border-b border-border text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-2">IB StudyLab</p>
            <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {subject} — Quick Quiz
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{month} {year} • 10 Questions</p>
          </div>
        )}

        {/* Paper body */}
        <div
          className="ib-paper-body px-10 py-8"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />

        {/* Footer */}
        <div className="px-10 py-4 border-t border-border flex justify-between text-[10px] text-muted-foreground/50 uppercase tracking-wider">
          <span>IB StudyLab — Practice Paper</span>
          <span>Turn over →</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Content formatter ────────────────────────────────────────── */

function formatPaperContent(
  content: string,
  diagramImages: Record<string, string>,
  loadingDiagrams: Record<string, boolean>
): string {
  // Split content into lines for precise control
  const lines = content.split("\n");
  const htmlParts: string[] = [];
  let inSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      // Blank line = spacer
      continue;
    }

    // Section headers: ## Section A
    const sectionMatch = line.match(/^##\s+(.+)/);
    if (sectionMatch) {
      if (inSection) htmlParts.push("</div>"); // close prev section
      inSection = true;
      htmlParts.push(`
        <div class="ib-section" style="page-break-inside: avoid;">
          <div class="ib-section-header">
            <div class="ib-section-line"></div>
            <span class="ib-section-title">${escapeHtml(sectionMatch[1])}</span>
            <div class="ib-section-line"></div>
          </div>
      `);
      continue;
    }

    // Sub-section headers: ### ...
    const subSectionMatch = line.match(/^###\s+(.+)/);
    if (subSectionMatch) {
      htmlParts.push(`<h3 class="ib-subsection-title">${escapeHtml(subSectionMatch[1])}</h3>`);
      continue;
    }

    // Question number: "1. ..."
    const questionMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (questionMatch) {
      htmlParts.push(`
        <div class="ib-question" style="page-break-inside: avoid;">
          <div class="ib-question-header">
            <span class="ib-question-number">${questionMatch[1]}.</span>
            <div class="ib-question-text">${processInlineContent(questionMatch[2], diagramImages, loadingDiagrams)}</div>
          </div>
      `);
      // Collect continuation lines (not sub-parts, not new questions, not sections)
      while (i + 1 < lines.length) {
        const next = lines[i + 1].trim();
        if (!next || next.match(/^(\d+)\.\s/) || next.match(/^##/) || next.match(/^\([a-z]\)\s/) || next.match(/^\([ivx]+\)\s/) || next.match(/^\[(?:DIAGRAM|GRAPH)/i)) break;
        i++;
        htmlParts.push(`<div class="ib-question-continuation">${processInlineContent(next, diagramImages, loadingDiagrams)}</div>`);
      }
      // Don't close .ib-question yet — sub-parts may follow
      // We'll close it at the next question or section
      htmlParts.push("</div>");
      continue;
    }

    // Sub-part: (a), (b), etc.
    const subPartMatch = line.match(/^\(([a-z])\)\s+(.*)/);
    if (subPartMatch) {
      htmlParts.push(`
        <div class="ib-subpart">
          <span class="ib-subpart-label">(${subPartMatch[1]})</span>
          <div class="ib-subpart-text">${processInlineContent(subPartMatch[2], diagramImages, loadingDiagrams)}</div>
        </div>
      `);
      continue;
    }

    // Sub-sub-part: (i), (ii), etc.
    const subSubMatch = line.match(/^\(([ivx]+)\)\s+(.*)/);
    if (subSubMatch) {
      htmlParts.push(`
        <div class="ib-subsubpart">
          <span class="ib-subsubpart-label">(${subSubMatch[1]})</span>
          <div class="ib-subsubpart-text">${processInlineContent(subSubMatch[2], diagramImages, loadingDiagrams)}</div>
        </div>
      `);
      continue;
    }

    // Diagram/Graph placeholder
    const diagramMatch = line.match(/^\[(DIAGRAM|GRAPH):?\s*(.*?)\]/i);
    if (diagramMatch) {
      htmlParts.push(renderDiagramPlaceholder(diagramMatch[1], diagramMatch[2], diagramImages, loadingDiagrams));
      continue;
    }

    // Quiz separator
    if (line === "---") {
      htmlParts.push('<hr class="ib-quiz-divider" />');
      continue;
    }

    // MCQ options: A) ... B) ...
    const optionMatch = line.match(/^([A-D])\)\s+(.*)/);
    if (optionMatch) {
      htmlParts.push(`
        <div class="ib-mcq-option">
          <span class="ib-mcq-label">${optionMatch[1]}</span>
          <span class="ib-mcq-text">${processInlineContent(optionMatch[2], diagramImages, loadingDiagrams)}</span>
        </div>
      `);
      continue;
    }

    // Answer reveal (quiz mode)
    const answerMatch = line.match(/^\*\*Answer:\s*([A-D])\*\*/);
    if (answerMatch) {
      htmlParts.push(`<div class="ib-answer-reveal">Answer: ${answerMatch[1]}</div>`);
      continue;
    }

    // Regular paragraph
    htmlParts.push(`<p class="ib-paragraph">${processInlineContent(line, diagramImages, loadingDiagrams)}</p>`);
  }

  if (inSection) htmlParts.push("</div>");

  return htmlParts.join("\n");
}

function processInlineContent(
  text: string,
  diagramImages: Record<string, string>,
  loadingDiagrams: Record<string, boolean>
): string {
  let result = text;

  // Bold
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Italic
  result = result.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Marks: [2], [4 marks]
  result = result.replace(/\[(\d+)\s*marks?\]/gi, '<span class="ib-marks">$1</span>');
  result = result.replace(/\[(\d+)\]/g, (match, num) => {
    const n = parseInt(num);
    if (n > 0 && n <= 50) return `<span class="ib-marks">${n}</span>`;
    return match;
  });

  // Inline diagram
  result = result.replace(/\[(DIAGRAM|GRAPH):?\s*(.*?)\]/gi, (_m, type, desc) => {
    return renderDiagramPlaceholder(type, desc, diagramImages, loadingDiagrams);
  });

  return result;
}

function renderDiagramPlaceholder(
  type: string,
  description: string,
  diagramImages: Record<string, string>,
  loadingDiagrams: Record<string, boolean>
): string {
  const key = `${type}-${description}`.toLowerCase().replace(/\s+/g, "-");
  const imageUrl = diagramImages[key];
  const isLoading = loadingDiagrams[key];

  if (imageUrl) {
    return `<div class="ib-diagram-rendered"><img src="${imageUrl}" alt="${escapeHtml(description)}" /></div>`;
  }

  if (isLoading) {
    return `<div class="ib-diagram-loading">
      <div class="ib-diagram-spinner"></div>
      <span>Generating ${type.toLowerCase()}…</span>
    </div>`;
  }

  return `<div class="ib-diagram-placeholder">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 16l5-5 4 4 4-6 5 7"/></svg>
    <span>${escapeHtml(type)}: ${escapeHtml(description)}</span>
  </div>`;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
