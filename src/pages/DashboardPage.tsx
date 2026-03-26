import { AppLayout } from "@/components/AppLayout";
import { motion } from "framer-motion";
import { FileText, Database, Clock, BookOpen, Layers, GraduationCap, Languages, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  { title: "Practice Papers", desc: "Generate IB-style exam papers", icon: FileText, url: "/practice-papers", color: "from-primary to-primary/70" },
  { title: "Question Bank", desc: "Browse and filter questions", icon: Database, url: "/question-bank", color: "from-info to-info/70" },
  { title: "Timed Quizzes", desc: "Test under pressure", icon: Clock, url: "/quizzes", color: "from-accent to-accent/70" },
  { title: "Notes Library", desc: "Organized study notes", icon: BookOpen, url: "/notes", color: "from-warning to-warning/70" },
  { title: "Flashcards", desc: "Active recall training", icon: Layers, url: "/flashcards", color: "from-destructive to-destructive/70" },
  { title: "TOK", desc: "Essay grading & prompts", icon: GraduationCap, url: "/tok", color: "from-success to-success/70" },
  { title: "Language Ab Initio", desc: "Vocab, Paper 1 & 2, oral", icon: Languages, url: "/language", color: "from-info to-primary/70" },
];

const stats = [
  { label: "Papers Generated", value: "0", icon: FileText },
  { label: "Questions Practiced", value: "0", icon: Database },
  { label: "Study Hours", value: "0", icon: Clock },
  { label: "Streak", value: "0 days", icon: TrendingUp },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="space-y-8 pt-8 lg:pt-0">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold font-display">Welcome to IB StudyLab</h1>
          <p className="text-muted-foreground text-lg">Your all-in-one IB study companion. Choose a tool to get started.</p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <stat.icon className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
              <div className="text-2xl font-bold font-display">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
            >
              <button
                onClick={() => navigate(feature.url)}
                className="w-full study-card text-left group"
              >
                <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
