export const IB_SUBJECTS = [
  { id: "math-aa-hl", name: "Mathematics AA HL", group: "Mathematics" },
  { id: "math-aa-sl", name: "Mathematics AA SL", group: "Mathematics" },
  { id: "math-ai-hl", name: "Mathematics AI HL", group: "Mathematics" },
  { id: "math-ai-sl", name: "Mathematics AI SL", group: "Mathematics" },
  { id: "physics-hl", name: "Physics HL", group: "Sciences" },
  { id: "physics-sl", name: "Physics SL", group: "Sciences" },
  { id: "chemistry-hl", name: "Chemistry HL", group: "Sciences" },
  { id: "chemistry-sl", name: "Chemistry SL", group: "Sciences" },
  { id: "biology-hl", name: "Biology HL", group: "Sciences" },
  { id: "biology-sl", name: "Biology SL", group: "Sciences" },
  { id: "economics-hl", name: "Economics HL", group: "Humanities" },
  { id: "economics-sl", name: "Economics SL", group: "Humanities" },
  { id: "history-hl", name: "History HL", group: "Humanities" },
  { id: "english-a-hl", name: "English A HL", group: "Language & Literature" },
  { id: "english-a-sl", name: "English A SL", group: "Language & Literature" },
  { id: "cs-hl", name: "Computer Science HL", group: "Sciences" },
  { id: "cs-sl", name: "Computer Science SL", group: "Sciences" },
];

export const SUBJECT_TOPICS: Record<string, string[]> = {
  "math-aa-hl": ["Number & Algebra", "Functions", "Geometry & Trigonometry", "Statistics & Probability", "Calculus"],
  "math-aa-sl": ["Number & Algebra", "Functions", "Geometry & Trigonometry", "Statistics & Probability", "Calculus"],
  "math-ai-hl": ["Number & Algebra", "Functions", "Geometry & Trigonometry", "Statistics & Probability", "Calculus"],
  "math-ai-sl": ["Number & Algebra", "Functions", "Geometry & Trigonometry", "Statistics & Probability", "Calculus"],
  "physics-hl": ["Measurements & Uncertainties", "Mechanics", "Thermal Physics", "Waves", "Electricity & Magnetism", "Circular Motion", "Atomic & Nuclear Physics", "Energy Production"],
  "physics-sl": ["Measurements & Uncertainties", "Mechanics", "Thermal Physics", "Waves", "Electricity & Magnetism", "Circular Motion", "Atomic & Nuclear Physics", "Energy Production"],
  "chemistry-hl": ["Stoichiometry", "Atomic Structure", "Periodicity", "Bonding", "Energetics", "Kinetics", "Equilibrium", "Acids & Bases", "Redox", "Organic Chemistry"],
  "chemistry-sl": ["Stoichiometry", "Atomic Structure", "Periodicity", "Bonding", "Energetics", "Kinetics", "Equilibrium", "Acids & Bases", "Redox", "Organic Chemistry"],
  "biology-hl": ["Cell Biology", "Molecular Biology", "Genetics", "Ecology", "Evolution & Biodiversity", "Human Physiology", "Nucleic Acids", "Metabolism"],
  "biology-sl": ["Cell Biology", "Molecular Biology", "Genetics", "Ecology", "Evolution & Biodiversity", "Human Physiology"],
  "economics-hl": ["Microeconomics", "Macroeconomics", "International Economics", "Development Economics"],
  "economics-sl": ["Microeconomics", "Macroeconomics", "International Economics", "Development Economics"],
  "history-hl": ["Causes of Wars", "Effects of Wars", "Authoritarian States", "Cold War", "Rights & Protest"],
  "english-a-hl": ["Readers, Writers & Texts", "Time & Space", "Intertextuality"],
  "english-a-sl": ["Readers, Writers & Texts", "Time & Space", "Intertextuality"],
  "cs-hl": ["System Fundamentals", "Computer Organization", "Networks", "Computational Thinking", "Abstract Data Structures", "Resource Management", "Control"],
  "cs-sl": ["System Fundamentals", "Computer Organization", "Networks", "Computational Thinking"],
};

export type Difficulty = "easy" | "medium" | "hard";
export type PaperMode = "past-paper" | "quiz";

export interface PaperConfig {
  subject: string;
  mode: PaperMode;
  topics: string[];
  difficulty: Difficulty;
}

export interface GeneratedQuestion {
  id: number;
  question: string;
  marks: number;
  topic: string;
  section: string;
}

export interface GeneratedPaper {
  title: string;
  subject: string;
  duration: string;
  totalMarks: number;
  instructions: string[];
  sections: {
    name: string;
    questions: GeneratedQuestion[];
  }[];
}

export interface FlashcardData {
  id: string;
  front: string;
  back: string;
  topic: string;
  subject: string;
  difficulty: Difficulty;
  mastered: boolean;
}

export interface NoteData {
  id: string;
  title: string;
  content: string;
  subject: string;
  topic: string;
  updatedAt: string;
}

export interface QuizConfig {
  subject: string;
  topics: string[];
  duration: number; // minutes
  questionCount: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}
