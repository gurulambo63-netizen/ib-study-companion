import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, Mic, FileText, MessageSquare } from "lucide-react";

const vocabSets = [
  { category: "Greetings", words: [
    { word: "Bonjour", translation: "Hello", example: "Bonjour, comment allez-vous?" },
    { word: "Au revoir", translation: "Goodbye", example: "Au revoir, à demain!" },
    { word: "Merci", translation: "Thank you", example: "Merci beaucoup pour votre aide." },
    { word: "S'il vous plaît", translation: "Please", example: "Un café, s'il vous plaît." },
  ]},
  { category: "School", words: [
    { word: "L'école", translation: "School", example: "Je vais à l'école chaque jour." },
    { word: "Le professeur", translation: "Teacher", example: "Le professeur est très gentil." },
    { word: "Les devoirs", translation: "Homework", example: "J'ai beaucoup de devoirs ce soir." },
    { word: "La classe", translation: "Class", example: "Ma classe préférée est le français." },
  ]},
  { category: "Daily Life", words: [
    { word: "La maison", translation: "House", example: "Ma maison est grande." },
    { word: "La famille", translation: "Family", example: "J'aime ma famille." },
    { word: "Le repas", translation: "Meal", example: "Le repas est délicieux." },
    { word: "Le travail", translation: "Work", example: "Mon père va au travail." },
  ]},
];

const tabs = [
  { id: "vocab", label: "Vocabulary", icon: BookOpen },
  { id: "paper1", label: "Paper 1", icon: FileText },
  { id: "paper2", label: "Paper 2", icon: FileText },
  { id: "oral", label: "Oral Prep", icon: Mic },
];

export default function LanguagePage() {
  const [activeTab, setActiveTab] = useState("vocab");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <AppLayout>
      <div className="space-y-6 pt-8 lg:pt-0 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold font-display mb-2">Language Ab Initio</h1>
          <p className="text-muted-foreground">Vocabulary, reading, writing, and oral preparation</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className="gap-2 whitespace-nowrap"
            >
              <tab.icon className="h-4 w-4" /> {tab.label}
            </Button>
          ))}
        </div>

        {activeTab === "vocab" && (
          <div className="space-y-4">
            {vocabSets.map(set => (
              <div key={set.category} className="glass-card overflow-hidden">
                <button
                  onClick={() => setExpandedCategory(expandedCategory === set.category ? null : set.category)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-display font-semibold">{set.category}</h3>
                  <span className="text-sm text-muted-foreground">{set.words.length} words</span>
                </button>
                {expandedCategory === set.category && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="border-t border-border">
                    <div className="p-4 space-y-3">
                      {set.words.map(w => (
                        <div key={w.word} className="flex items-start justify-between p-3 rounded-lg bg-muted/30">
                          <div>
                            <p className="font-semibold">{w.word}</p>
                            <p className="text-sm text-muted-foreground">{w.translation}</p>
                            <p className="text-xs text-muted-foreground italic mt-1">"{w.example}"</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "paper1" && (
          <div className="glass-card p-8 text-center">
            <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-display font-bold mb-2">Paper 1 — Reading Comprehension</h2>
            <p className="text-muted-foreground mb-4">Practice with authentic reading texts and comprehension questions</p>
            <Button size="lg">Start Practice</Button>
          </div>
        )}

        {activeTab === "paper2" && (
          <div className="glass-card p-8 text-center">
            <FileText className="h-12 w-12 text-accent mx-auto mb-4" />
            <h2 className="text-xl font-display font-bold mb-2">Paper 2 — Writing</h2>
            <p className="text-muted-foreground mb-4">Practice writing tasks: emails, blogs, articles, and more</p>
            <Button size="lg">Start Practice</Button>
          </div>
        )}

        {activeTab === "oral" && (
          <div className="glass-card p-8 text-center">
            <Mic className="h-12 w-12 text-success mx-auto mb-4" />
            <h2 className="text-xl font-display font-bold mb-2">Oral Preparation</h2>
            <p className="text-muted-foreground mb-4">Practice conversation topics, photo descriptions, and role plays</p>
            <div className="space-y-3 max-w-md mx-auto text-left">
              {["Introduce yourself and your family", "Describe your daily routine", "Talk about your hobbies", "Discuss your future plans"].map(topic => (
                <div key={topic} className="p-3 rounded-lg border border-border flex items-center gap-3">
                  <MessageSquare className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
