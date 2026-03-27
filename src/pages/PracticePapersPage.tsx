import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { IB_SUBJECTS, SUBJECT_TOPICS, type PaperMode, type Difficulty, type PaperConfig } from "@/lib/ib-data";
import { FileText, Zap, ChevronLeft, Loader2 } from "lucide-react";
import { IBPaperView } from "@/components/IBPaperView";
import { toast } from "sonner";

type Step = "subject" | "mode" | "topics" | "difficulty" | "generating" | "result";

export default function PracticePapersPage() {
  const [step, setStep] = useState<Step>("subject");
  const [subject, setSubject] = useState("");
  const [mode, setMode] = useState<PaperMode>("past-paper");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [generatedPaper, setGeneratedPaper] = useState<string | null>(null);

  const subjectObj = IB_SUBJECTS.find(s => s.id === subject);
  const topics = subject ? (SUBJECT_TOPICS[subject] || []) : [];

  const grouped = IB_SUBJECTS.reduce((acc, s) => {
    if (!acc[s.group]) acc[s.group] = [];
    acc[s.group].push(s);
    return acc;
  }, {} as Record<string, typeof IB_SUBJECTS>);

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => {
      if (prev.includes(topic)) return prev.filter(t => t !== topic);
      if (prev.length >= 4) return prev;
      return [...prev, topic];
    });
  };

  const handleGenerate = async () => {
    if (selectedTopics.length === 0) {
      toast.error("Please select at least one topic");
      return;
    }
    setStep("generating");

    // Simulate generation — replace with your own AI endpoint when ready
    await new Promise((res) => setTimeout(res, 1500));
    const topicList = selectedTopics.join(", ");
    const paper = mode === "past-paper"
      ? `## ${subjectObj?.name} — Practice Paper\n**Topics:** ${topicList}\n**Difficulty:** ${difficulty}\n\n---\n\n### Section A — Short Answer Questions\n\n**Question 1** [4 marks]\nExplain the key principles of ${selectedTopics[0]} with reference to a specific example.\n\n**Question 2** [6 marks]\nAnalyse the relationship between ${selectedTopics[0]}${selectedTopics[1] ? ` and ${selectedTopics[1]}` : ""}. Use appropriate terminology.\n\n---\n\n### Section B — Extended Response\n\n**Question 3** [10 marks]\nEvaluate the importance of ${topicList} in the context of ${subjectObj?.name}. Your answer should include worked examples, diagrams where appropriate, and a conclusion.\n\n---\n\n*This is a demo paper. Connect an AI endpoint for AI-generated questions.*`
      : `## ${subjectObj?.name} — Quick Quiz\n**Topics:** ${topicList} · **Difficulty:** ${difficulty}\n\n---\n\n**Q1.** Which of the following best describes a key concept in ${selectedTopics[0]}?\n- A. Option one\n- B. Option two\n- C. Option three *(correct)*\n- D. Option four\n\n**Q2.** True or False: ${selectedTopics[0]} involves a direct relationship between cause and effect.\n*(Answer: True)*\n\n**Q3.** Define ${selectedTopics[0]} in your own words and give one real-world application.\n\n---\n\n*This is a demo quiz. Connect an AI endpoint for AI-generated questions.*`;

    setGeneratedPaper(paper);
    setStep("result");
  };

  const goBack = () => {
    const steps: Step[] = ["subject", "mode", "topics", "difficulty"];
    const idx = steps.indexOf(step);
    if (idx > 0) setStep(steps[idx - 1]);
  };

  const reset = () => {
    setStep("subject");
    setSubject("");
    setMode("past-paper");
    setSelectedTopics([]);
    setDifficulty("medium");
    setGeneratedPaper(null);
  };

  return (
    <AppLayout>
      <div className="space-y-6 pt-8 lg:pt-0 max-w-4xl mx-auto">
        {step !== "subject" && step !== "result" && step !== "generating" && (
          <Button variant="ghost" onClick={goBack} className="gap-2">
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Subject Selection */}
          {step === "subject" && (
            <motion.div key="subject" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h1 className="text-3xl font-bold font-display mb-2">Practice Papers</h1>
              <p className="text-muted-foreground mb-6">Select your subject to get started</p>
              <div className="space-y-6">
                {Object.entries(grouped).map(([group, subjects]) => (
                  <div key={group}>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{group}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {subjects.map(s => (
                        <button
                          key={s.id}
                          onClick={() => { setSubject(s.id); setStep("mode"); }}
                          className="study-card text-left p-4"
                        >
                          <span className="font-medium">{s.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Mode Selection */}
          {step === "mode" && (
            <motion.div key="mode" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-bold font-display mb-2">{subjectObj?.name}</h2>
              <p className="text-muted-foreground mb-6">Choose your practice mode</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button
                  onClick={() => { setMode("past-paper"); setStep("topics"); }}
                  className="study-card p-8 text-center group"
                >
                  <FileText className="h-16 w-16 mx-auto text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display font-bold text-xl mb-2">Past Year Paper</h3>
                  <p className="text-sm text-muted-foreground">Full IB exam-style paper with proper formatting, sections, and mark schemes</p>
                </button>
                <button
                  onClick={() => { setMode("quiz"); setStep("topics"); }}
                  className="study-card p-8 text-center group"
                >
                  <Zap className="h-16 w-16 mx-auto text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-display font-bold text-xl mb-2">Quick Quiz</h3>
                  <p className="text-sm text-muted-foreground">Short multiple-choice quiz for rapid revision and knowledge checks</p>
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Topic Focus */}
          {step === "topics" && (
            <motion.div key="topics" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-bold font-display mb-2">Topic Focus</h2>
              <p className="text-muted-foreground mb-6">Select 1-4 topics to focus on</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topics.map(topic => {
                  const active = selectedTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      onClick={() => toggleTopic(topic)}
                      className={`study-card p-4 text-left transition-all ${active ? "border-primary bg-primary/5 ring-2 ring-primary/20" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${active ? "bg-primary border-primary" : "border-muted-foreground/30"}`}>
                          {active && <span className="text-primary-foreground text-xs font-bold">✓</span>}
                        </div>
                        <span className="font-medium">{topic}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{selectedTopics.length}/4 topics selected</p>
                <Button
                  onClick={() => setStep("difficulty")}
                  disabled={selectedTopics.length === 0}
                  size="lg"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Difficulty */}
          {step === "difficulty" && (
            <motion.div key="difficulty" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-bold font-display mb-2">Difficulty Level</h2>
              <p className="text-muted-foreground mb-6">Choose your challenge level</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(["easy", "medium", "hard"] as Difficulty[]).map(d => (
                  <Button
                    key={d}
                    variant={difficulty === d ? "difficulty-active" : "difficulty"}
                    size="xl"
                    className="h-24 flex-col gap-2"
                    onClick={() => setDifficulty(d)}
                  >
                    <span className="text-2xl">{d === "easy" ? "🟢" : d === "medium" ? "🟡" : "🔴"}</span>
                    <span className="capitalize text-lg">{d}</span>
                  </Button>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button onClick={handleGenerate} size="xl" className="min-w-[200px]">
                  Generate {mode === "past-paper" ? "Paper" : "Quiz"}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Generating */}
          {step === "generating" && (
            <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold font-display mb-2">Generating your {mode === "past-paper" ? "paper" : "quiz"}...</h2>
              <p className="text-muted-foreground">This may take a few seconds</p>
            </motion.div>
          )}

          {/* Result */}
          {step === "result" && generatedPaper && (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-display">Your Paper</h2>
                <Button variant="outline" onClick={reset}>Generate Another</Button>
              </div>
              <IBPaperView content={generatedPaper} subject={subjectObj?.name || ""} mode={mode} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
