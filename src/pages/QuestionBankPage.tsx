import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { IB_SUBJECTS } from "@/lib/ib-data";
import { QUESTION_BANK } from "@/lib/question-bank-data";
import { Search } from "lucide-react";

export default function QuestionBankPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");

  const filtered = QUESTION_BANK.filter((q) => {
    if (searchQuery && !q.question.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (subjectFilter && q.subject !== subjectFilter) return false;
    if (difficultyFilter && q.difficulty !== difficultyFilter) return false;
    return true;
  });

  // Get unique subjects that actually have questions
  const subjectsWithQuestions = Array.from(new Set(QUESTION_BANK.map((q) => q.subject)));

  return (
    <AppLayout>
      <div className="space-y-6 pt-2 lg:pt-0">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold font-display mb-1">Question Bank</h1>
          <p className="text-sm text-muted-foreground">{QUESTION_BANK.length} questions across {subjectsWithQuestions.length} subjects</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-input bg-background text-sm"
          >
            <option value="">All Subjects</option>
            {subjectsWithQuestions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-input bg-background text-sm"
          >
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Count */}
        <p className="text-xs text-muted-foreground">{filtered.length} questions found</p>

        {/* Questions List */}
        <div className="space-y-3">
          {filtered.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.5) }}
              className="glass-card p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{q.subject}</span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{q.topic}</span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        q.difficulty === "easy"
                          ? "bg-success/10 text-success"
                          : q.difficulty === "medium"
                          ? "bg-warning/10 text-warning"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {q.difficulty}
                    </span>
                  </div>
                  <p className="font-medium text-sm">{q.question}</p>
                  <p className="text-xs text-muted-foreground mt-1">{q.marks} marks · {q.year}</p>
                </div>
                <Button variant="outline" size="sm" className="shrink-0">
                  Practice
                </Button>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">No questions match your filters</div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
