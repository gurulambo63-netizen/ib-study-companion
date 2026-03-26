import { useState, useEffect, useCallback } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { IB_SUBJECTS, SUBJECT_TOPICS } from "@/lib/ib-data";
import { Clock, Play, CheckCircle, XCircle, RotateCcw } from "lucide-react";

interface QuizQ {
  question: string;
  options: string[];
  correct: number;
  topic: string;
}

const sampleQuizQuestions: QuizQ[] = [
  { question: "What is the derivative of ln(x)?", options: ["x", "1/x", "e^x", "1"], correct: 1, topic: "Calculus" },
  { question: "Newton's second law states that F = ?", options: ["mv", "ma", "mg", "mv²"], correct: 1, topic: "Mechanics" },
  { question: "Which element has the highest electronegativity?", options: ["Oxygen", "Nitrogen", "Fluorine", "Chlorine"], correct: 2, topic: "Periodicity" },
  { question: "DNA replication is described as:", options: ["Conservative", "Dispersive", "Semi-conservative", "Non-conservative"], correct: 2, topic: "Genetics" },
  { question: "In economics, GDP stands for:", options: ["General Domestic Price", "Gross Domestic Product", "Global Development Plan", "Gross Demand Percentage"], correct: 1, topic: "Macroeconomics" },
];

const DURATIONS = [20, 30, 45, 60, 90, 120];

export default function QuizzesPage() {
  const [phase, setPhase] = useState<"setup" | "active" | "results">("setup");
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState(30);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [questions] = useState(sampleQuizQuestions);

  const startQuiz = () => {
    setPhase("active");
    setTimeLeft(duration * 60);
    setCurrentQ(0);
    setAnswers(new Array(questions.length).fill(null));
  };

  useEffect(() => {
    if (phase !== "active" || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setPhase("results");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, timeLeft]);

  const selectAnswer = (idx: number) => {
    setAnswers(prev => { const n = [...prev]; n[currentQ] = idx; return n; });
  };

  const score = answers.reduce((acc, a, i) => a === questions[i].correct ? acc + 1 : acc, 0);
  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <AppLayout>
      <div className="space-y-6 pt-8 lg:pt-0 max-w-3xl mx-auto">
        {phase === "setup" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold font-display mb-2">Timed Quizzes</h1>
              <p className="text-muted-foreground">Test your knowledge under timed conditions</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Select Subject</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {IB_SUBJECTS.slice(0, 9).map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSubject(s.id)}
                    className={`p-3 rounded-lg border text-sm text-left transition-all ${subject === s.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Duration</h3>
              <div className="flex flex-wrap gap-2">
                {DURATIONS.map(d => (
                  <Button
                    key={d}
                    variant={duration === d ? "difficulty-active" : "difficulty"}
                    onClick={() => setDuration(d)}
                  >
                    {d} min
                  </Button>
                ))}
              </div>
            </div>

            <Button onClick={startQuiz} size="xl" className="w-full gap-2">
              <Play className="h-5 w-5" /> Start Quiz
            </Button>
          </motion.div>
        )}

        {phase === "active" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Timer bar */}
            <div className="glass-card p-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Question {currentQ + 1}/{questions.length}</span>
              <div className="flex items-center gap-2 text-lg font-mono font-bold">
                <Clock className="h-5 w-5 text-primary" />
                <span className={timeLeft < 60 ? "text-destructive" : ""}>{formatTime(timeLeft)}</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => setPhase("results")}>Submit</Button>
            </div>

            {/* Progress dots */}
            <div className="flex gap-1.5 justify-center flex-wrap">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQ(i)}
                  className={`h-3 w-3 rounded-full transition-all ${
                    i === currentQ ? "bg-primary scale-125" :
                    answers[i] !== null ? "bg-primary/40" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            {/* Question */}
            <div className="glass-card p-6">
              <p className="text-xs text-muted-foreground mb-1">{questions[currentQ].topic}</p>
              <h2 className="text-lg font-semibold mb-6">{questions[currentQ].question}</h2>
              <div className="space-y-3">
                {questions[currentQ].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => selectAnswer(i)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      answers[currentQ] === i
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <span className="font-medium text-muted-foreground mr-3">{String.fromCharCode(65 + i)}</span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 justify-between">
              <Button variant="outline" disabled={currentQ === 0} onClick={() => setCurrentQ(currentQ - 1)}>Previous</Button>
              <Button
                disabled={currentQ === questions.length - 1}
                onClick={() => setCurrentQ(currentQ + 1)}
              >
                Next
              </Button>
            </div>
          </motion.div>
        )}

        {phase === "results" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold font-display mb-2">Quiz Complete!</h1>
              <div className="text-6xl font-bold font-display text-primary my-4">{score}/{questions.length}</div>
              <p className="text-muted-foreground">{Math.round((score / questions.length) * 100)}% correct</p>
            </div>

            <div className="space-y-3">
              {questions.map((q, i) => {
                const correct = answers[i] === q.correct;
                return (
                  <div key={i} className={`glass-card p-4 border-l-4 ${correct ? "border-l-success" : "border-l-destructive"}`}>
                    <div className="flex items-start gap-3">
                      {correct ? <CheckCircle className="h-5 w-5 text-success mt-0.5" /> : <XCircle className="h-5 w-5 text-destructive mt-0.5" />}
                      <div>
                        <p className="font-medium text-sm">{q.question}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Your answer: {answers[i] !== null ? q.options[answers[i]!] : "Not answered"} · Correct: {q.options[q.correct]}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button onClick={() => { setPhase("setup"); setAnswers([]); }} size="lg" className="w-full gap-2">
              <RotateCcw className="h-4 w-4" /> Try Again
            </Button>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
}
