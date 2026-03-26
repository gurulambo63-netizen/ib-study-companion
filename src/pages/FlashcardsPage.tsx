import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { IB_SUBJECTS } from "@/lib/ib-data";
import { RotateCcw, ChevronLeft, ChevronRight, Check, X, Shuffle } from "lucide-react";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
  mastered: boolean;
}

const sampleCards: Flashcard[] = [
  { id: "1", front: "What is the chain rule?", back: "If y = f(g(x)), then dy/dx = f'(g(x)) · g'(x)", subject: "Mathematics AA HL", mastered: false },
  { id: "2", front: "Define Newton's First Law", back: "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.", subject: "Physics HL", mastered: false },
  { id: "3", front: "What is electronegativity?", back: "The ability of an atom to attract a shared pair of electrons towards itself in a covalent bond.", subject: "Chemistry HL", mastered: false },
  { id: "4", front: "What is GDP?", back: "Gross Domestic Product — the total value of all final goods and services produced within a country's borders in a given year.", subject: "Economics HL", mastered: false },
  { id: "5", front: "What is mitosis?", back: "Cell division that results in two genetically identical daughter cells with the same number of chromosomes as the parent cell.", subject: "Biology HL", mastered: false },
  { id: "6", front: "State the ideal gas equation", back: "PV = nRT where P=pressure, V=volume, n=moles, R=gas constant, T=temperature in Kelvin.", subject: "Chemistry HL", mastered: false },
];

export default function FlashcardsPage() {
  const [cards, setCards] = useState(sampleCards);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState("");

  const filtered = cards.filter(c => !subjectFilter || c.subject === subjectFilter);
  const unmastered = filtered.filter(c => !c.mastered);
  const current = unmastered[currentIdx % Math.max(unmastered.length, 1)];
  const masteredCount = filtered.filter(c => c.mastered).length;

  const markMastered = () => {
    if (!current) return;
    setCards(prev => prev.map(c => c.id === current.id ? { ...c, mastered: true } : c));
    setFlipped(false);
    if (currentIdx >= unmastered.length - 1) setCurrentIdx(0);
  };

  const next = () => { setFlipped(false); setCurrentIdx(prev => (prev + 1) % Math.max(unmastered.length, 1)); };
  const prev = () => { setFlipped(false); setCurrentIdx(prev => (prev - 1 + Math.max(unmastered.length, 1)) % Math.max(unmastered.length, 1)); };

  const resetAll = () => {
    setCards(prev => prev.map(c => ({ ...c, mastered: false })));
    setCurrentIdx(0);
    setFlipped(false);
  };

  const shuffle = () => {
    setCards(prev => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    setFlipped(false);
  };

  return (
    <AppLayout>
      <div className="space-y-6 pt-8 lg:pt-0 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold font-display mb-2">Flashcards</h1>
          <p className="text-muted-foreground">Active recall study mode</p>
        </motion.div>

        <div className="flex items-center gap-3">
          <select
            value={subjectFilter}
            onChange={e => { setSubjectFilter(e.target.value); setCurrentIdx(0); setFlipped(false); }}
            className="px-3 py-2 rounded-lg border border-input bg-background text-sm flex-1"
          >
            <option value="">All Subjects</option>
            {[...new Set(cards.map(c => c.subject))].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <Button variant="outline" size="icon" onClick={shuffle}><Shuffle className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon" onClick={resetAll}><RotateCcw className="h-4 w-4" /></Button>
        </div>

        {/* Progress */}
        <div className="glass-card p-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{masteredCount}/{filtered.length} mastered</span>
          <div className="flex-1 mx-4 h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-success rounded-full transition-all" style={{ width: `${(masteredCount / Math.max(filtered.length, 1)) * 100}%` }} />
          </div>
          <span className="text-muted-foreground">{unmastered.length} remaining</span>
        </div>

        {current ? (
          <>
            {/* Card */}
            <div className="perspective-1000" style={{ perspective: "1000px" }}>
              <motion.div
                onClick={() => setFlipped(!flipped)}
                className="relative w-full cursor-pointer"
                style={{ transformStyle: "preserve-3d", minHeight: 280 }}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 glass-card p-8 flex flex-col items-center justify-center text-center"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <p className="text-xs text-muted-foreground mb-4">{current.subject}</p>
                  <p className="text-xl font-display font-semibold">{current.front}</p>
                  <p className="text-xs text-muted-foreground mt-6">Click to reveal answer</p>
                </div>
                {/* Back */}
                <div
                  className="absolute inset-0 glass-card p-8 flex flex-col items-center justify-center text-center bg-primary/5"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <p className="text-xs text-muted-foreground mb-4">Answer</p>
                  <p className="text-lg">{current.back}</p>
                </div>
              </motion.div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" size="icon" onClick={prev}><ChevronLeft className="h-5 w-5" /></Button>
              <Button variant="destructive" size="lg" onClick={next} className="gap-2"><X className="h-4 w-4" /> Still Learning</Button>
              <Button variant="success" size="lg" onClick={markMastered} className="gap-2"><Check className="h-4 w-4" /> Mastered</Button>
              <Button variant="outline" size="icon" onClick={next}><ChevronRight className="h-5 w-5" /></Button>
            </div>
          </>
        ) : (
          <div className="glass-card p-12 text-center">
            <h2 className="text-2xl font-display font-bold mb-2">🎉 All cards mastered!</h2>
            <p className="text-muted-foreground mb-4">Great job! You've mastered all flashcards.</p>
            <Button onClick={resetAll} variant="outline">Reset & Study Again</Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
