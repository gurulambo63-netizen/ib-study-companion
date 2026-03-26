import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Send, BookOpen } from "lucide-react";

const tokPrompts = [
  "To what extent is certainty attainable in the natural sciences?",
  "How can we distinguish between knowledge and belief?",
  "Is there a hierarchy of areas of knowledge?",
  "To what extent does language shape our knowledge?",
  "Can ethical knowledge be objective?",
  "How do we know when a paradigm shift has occurred?",
];

export default function TOKPage() {
  const [essay, setEssay] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const gradeEssay = async () => {
    if (!essay.trim()) { toast.error("Please write your essay first"); return; }
    if (essay.trim().split(/\s+/).length < 50) { toast.error("Essay should be at least 50 words"); return; }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("grade-tok-essay", {
        body: { essay, prompt: selectedPrompt },
      });
      if (error) throw error;
      setFeedback(data.feedback);
    } catch (err) {
      console.error(err);
      toast.error("Failed to grade essay. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6 pt-8 lg:pt-0 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold font-display mb-2">Theory of Knowledge</h1>
          <p className="text-muted-foreground">AI-powered essay grading and TOK prompts</p>
        </motion.div>

        {/* Prompts */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2"><BookOpen className="h-4 w-4" /> TOK Prompts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tokPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => setSelectedPrompt(prompt)}
                className={`study-card p-4 text-left text-sm transition-all ${selectedPrompt === prompt ? "border-primary bg-primary/5 ring-2 ring-primary/20" : ""}`}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Essay Input */}
        <div className="space-y-3">
          <h3 className="font-semibold">Your Essay</h3>
          {selectedPrompt && (
            <div className="glass-card p-3 text-sm text-primary font-medium">
              Prompt: {selectedPrompt}
            </div>
          )}
          <textarea
            value={essay}
            onChange={e => setEssay(e.target.value)}
            rows={16}
            className="w-full bg-background border border-input rounded-lg p-4 text-sm outline-none focus:ring-2 focus:ring-ring resize-y"
            placeholder="Write or paste your TOK essay here..."
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{essay.trim().split(/\s+/).filter(Boolean).length} words</span>
            <Button onClick={gradeEssay} disabled={loading} size="lg" className="gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Grade Essay
            </Button>
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
            <h3 className="font-display font-bold text-xl mb-4">AI Feedback</h3>
            <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap">
              {feedback}
            </div>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}
