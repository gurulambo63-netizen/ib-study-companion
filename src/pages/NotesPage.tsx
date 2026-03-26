import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { IB_SUBJECTS } from "@/lib/ib-data";
import { Plus, BookOpen, Search, Edit3, Trash2 } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  topic: string;
  updatedAt: string;
}

const initialNotes: Note[] = [
  { id: "1", title: "Calculus Key Formulas", content: "Chain rule, product rule, quotient rule, integration by parts...", subject: "Mathematics AA HL", topic: "Calculus", updatedAt: "2024-01-15" },
  { id: "2", title: "Newton's Laws Summary", content: "First law: inertia. Second law: F = ma. Third law: action-reaction...", subject: "Physics HL", topic: "Mechanics", updatedAt: "2024-01-14" },
  { id: "3", title: "Organic Chemistry Reactions", content: "Substitution, elimination, addition, condensation reactions...", subject: "Chemistry HL", topic: "Organic Chemistry", updatedAt: "2024-01-13" },
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [editing, setEditing] = useState<Note | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editSubject, setEditSubject] = useState("");

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startNew = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "Untitled Note",
      content: "",
      subject: IB_SUBJECTS[0].name,
      topic: "",
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setEditing(newNote);
    setEditTitle(newNote.title);
    setEditContent(newNote.content);
    setEditSubject(newNote.subject);
  };

  const saveNote = () => {
    if (!editing) return;
    const updated = { ...editing, title: editTitle, content: editContent, subject: editSubject, updatedAt: new Date().toISOString().split("T")[0] };
    setNotes(prev => {
      const exists = prev.find(n => n.id === updated.id);
      if (exists) return prev.map(n => n.id === updated.id ? updated : n);
      return [updated, ...prev];
    });
    setEditing(null);
  };

  const deleteNote = (id: string) => setNotes(prev => prev.filter(n => n.id !== id));

  return (
    <AppLayout>
      <div className="space-y-6 pt-8 lg:pt-0">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display mb-2">Notes Library</h1>
            <p className="text-muted-foreground">Organize your study notes by subject and topic</p>
          </div>
          <Button onClick={startNew} className="gap-2"><Plus className="h-4 w-4" /> New Note</Button>
        </motion.div>

        {editing ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6 space-y-4">
            <input
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              className="w-full text-2xl font-display font-bold bg-transparent border-none outline-none placeholder:text-muted-foreground"
              placeholder="Note title..."
            />
            <select
              value={editSubject}
              onChange={e => setEditSubject(e.target.value)}
              className="px-3 py-2 rounded-lg border border-input bg-background text-sm"
            >
              {IB_SUBJECTS.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
            </select>
            <textarea
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
              rows={12}
              className="w-full bg-transparent border border-input rounded-lg p-4 text-sm outline-none focus:ring-2 focus:ring-ring resize-y"
              placeholder="Start writing your notes..."
            />
            <div className="flex gap-3">
              <Button onClick={saveNote}>Save Note</Button>
              <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((note, i) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-5 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">{note.subject}</span>
                      <h3 className="font-display font-semibold text-lg mt-2">{note.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{note.content}</p>
                      <p className="text-xs text-muted-foreground mt-3">{note.updatedAt}</p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost" size="icon"
                        onClick={() => { setEditing(note); setEditTitle(note.title); setEditContent(note.content); setEditSubject(note.subject); }}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteNote(note.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
