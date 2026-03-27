import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import DashboardPage from "./pages/DashboardPage";
import PracticePapersPage from "./pages/PracticePapersPage";
import QuestionBankPage from "./pages/QuestionBankPage";
import QuizzesPage from "./pages/QuizzesPage";
import NotesPage from "./pages/NotesPage";
import FlashcardsPage from "./pages/FlashcardsPage";
import TOKPage from "./pages/TOKPage";
import LanguagePage from "./pages/LanguagePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/practice-papers" element={<PracticePapersPage />} />
            <Route path="/question-bank" element={<QuestionBankPage />} />
            <Route path="/quizzes" element={<QuizzesPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/tok" element={<TOKPage />} />
            <Route path="/language" element={<LanguagePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
