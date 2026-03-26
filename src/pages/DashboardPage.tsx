import { AppLayout } from "@/components/AppLayout";
import { motion } from "framer-motion";
import { Flame, Zap, Star, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IB_SUBJECTS, SUBJECT_TOPICS } from "@/lib/ib-data";
import { Progress } from "@/components/ui/progress";

const xp = 20;
const maxXp = 200;
const level = 1;
const streak = 7;

export default function DashboardPage() {
  const navigate = useNavigate();

  // Pick a handful of subjects to show
  const featuredSubjects = IB_SUBJECTS.slice(0, 8);

  return (
    <AppLayout>
      <div className="space-y-8 pt-2 lg:pt-0">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold font-display"
        >
          Dashboard
        </motion.h1>

        {/* Top row: Streak + Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Streak card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="lg:col-span-3 glass-card p-6 flex items-center gap-5"
          >
            <div className="h-14 w-14 rounded-2xl bg-accent/20 flex items-center justify-center shrink-0">
              <Flame className="h-7 w-7 text-accent" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold font-display">{streak}</span>
                <span className="text-lg font-semibold">Day Study Streak</span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">Keep it up! Study today to maintain your streak.</p>
            </div>
          </motion.div>

          {/* Progress card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <h3 className="font-semibold text-sm mb-4">Your Progress</h3>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 text-center mb-4">
              <div>
                <Flame className="h-4 w-4 mx-auto text-warning mb-1" />
                <div className="text-2xl font-bold font-display">{streak}</div>
                <div className="text-[11px] text-muted-foreground">Day Streak</div>
              </div>
              <div>
                <Zap className="h-4 w-4 mx-auto text-info mb-1" />
                <div className="text-2xl font-bold font-display">{xp}</div>
                <div className="text-[11px] text-muted-foreground">Total XP</div>
              </div>
              <div>
                <Star className="h-4 w-4 mx-auto text-warning mb-1" />
                <div className="text-2xl font-bold font-display">{level}</div>
                <div className="text-[11px] text-muted-foreground">Level</div>
              </div>
            </div>

            {/* XP bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>Level {level}</span>
                <span>{xp} / {maxXp} XP</span>
              </div>
              <Progress value={(xp / maxXp) * 100} className="h-2" />
              <p className="text-[11px] text-muted-foreground">{maxXp - xp} XP to Level {level + 1}</p>
            </div>

            {/* Activity */}
            <div className="flex gap-4 mt-3 text-[11px] text-muted-foreground">
              <span>📝 0 quizzes (+0 XP)</span>
              <span>🃏 1 decks (+20 XP)</span>
            </div>
          </motion.div>
        </div>

        {/* Subjects */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-display">Your Subjects</h2>
            <button
              onClick={() => navigate("/question-bank")}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              Browse All Subjects <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {featuredSubjects.map((subj, i) => {
              const isHL = subj.name.includes("HL");
              const topicCount = SUBJECT_TOPICS[subj.id]?.length || 0;
              // Clean name: remove "HL" / "SL" suffix for display
              const displayName = subj.name.replace(/ (HL|SL)$/, "");

              return (
                <motion.button
                  key={subj.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.03 }}
                  onClick={() => navigate("/practice-papers")}
                  className="glass-card p-4 text-left hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-sm leading-tight">{displayName}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                        isHL
                          ? "bg-primary/15 text-primary"
                          : "bg-accent/15 text-accent"
                      }`}
                    >
                      {isHL ? "HL" : "SL"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">{topicCount} topics</p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h2 className="text-xl font-bold font-display mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Practice Papers", url: "/practice-papers", emoji: "📄" },
              { label: "Flashcards", url: "/flashcards", emoji: "🃏" },
              { label: "Quizzes", url: "/quizzes", emoji: "⚡" },
              { label: "Notes", url: "/notes", emoji: "📝" },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.url)}
                className="glass-card p-4 text-center hover:border-primary/30 transition-all"
              >
                <span className="text-2xl mb-2 block">{action.emoji}</span>
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
