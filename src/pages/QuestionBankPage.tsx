import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { IB_SUBJECTS, SUBJECT_TOPICS } from "@/lib/ib-data";
import { Search, Filter, ChevronDown } from "lucide-react";

const sampleQuestions = [
  { id: 1, subject: "Mathematics AA HL", topic: "Calculus", question: "Find the derivative of f(x) = x³ sin(2x)", difficulty: "medium", marks: 6, year: 2023 },
  { id: 2, subject: "Physics HL", topic: "Mechanics", question: "A projectile is launched at 45° with initial velocity 20 m/s. Calculate the maximum height.", difficulty: "easy", marks: 4, year: 2022 },
  { id: 3, subject: "Chemistry HL", topic: "Organic Chemistry", question: "Draw the structural formula and name the product of the reaction between ethene and HBr.", difficulty: "medium", marks: 5, year: 2023 },
  { id: 4, subject: "Biology HL", topic: "Genetics", question: "Explain the process of DNA replication, including the role of helicase and DNA polymerase.", difficulty: "hard", marks: 8, year: 2022 },
  { id: 5, subject: "Economics HL", topic: "Macroeconomics", question: "Evaluate the effectiveness of expansionary fiscal policy in reducing unemployment.", difficulty: "hard", marks: 10, year: 2023 },
  { id: 6, subject: "Mathematics AA HL", topic: "Statistics & Probability", question: "Given P(A) = 0.4, P(B) = 0.5, and P(A ∩ B) = 0.2, find P(A | B).", difficulty: "easy", marks: 3, year: 2022 },
];

export default function QuestionBankPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");

  const filtered = sampleQuestions.filter(q => {
    if (searchQuery && !q.question.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (subjectFilter && q.subject !== subjectFilter) return false;
    if (difficultyFilter && q.difficulty !== difficultyFilter) return false;
    return true;
  });

  return (
    <AppLayout>
      <div className="space-y-6 pt-8 lg:pt-0">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold font-display mb-2">Question Bank</h1>
          <p className="text-muted-foreground">Browse, filter, and practice IB questions</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            value={subjectFilter}
            onChange={e => setSubjectFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-input bg-background text-sm"
          >
            <option value="">All Subjects</option>
            {IB_SUBJECTS.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
          <select
            value={difficultyFilter}
            onChange={e => setDifficultyFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-input bg-background text-sm"
          >
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Questions List */}
        <div className="space-y-3">
          {filtered.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{q.subject}</span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{q.topic}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      q.difficulty === "easy" ? "bg-success/10 text-success" :
                      q.difficulty === "medium" ? "bg-warning/10 text-warning" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <p className="font-medium">{q.question}</p>
                  <p className="text-xs text-muted-foreground mt-1">{q.marks} marks · {q.year}</p>
                </div>
                <Button variant="outline" size="sm">Practice</Button>
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
