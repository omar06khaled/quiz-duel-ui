import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, LogOut, Undo2, Eye, SkipForward, Check, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Question } from "@/data/categories";
import { SkipConfirmDialog } from "./SkipConfirmDialog";
import { LeaveConfirmDialog } from "./LeaveConfirmDialog";

interface QuestionScreenProps {
  category: string;
  points: number;
  question: Question;
  currentTeam: 1 | 2;
  onCorrect: () => void;
  onIncorrect: () => void;
  onSkip: () => void;
  onBack: () => void;
  onExit: () => void;
  onUndo: () => void;
  canUndo: boolean;
}

export const QuestionScreen = ({
  category,
  points,
  question,
  currentTeam,
  onCorrect,
  onIncorrect,
  onSkip,
  onBack,
  onExit,
  onUndo,
  canUndo,
}: QuestionScreenProps) => {
  const [revealed, setRevealed] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [showSkipDialog, setShowSkipDialog] = useState(false);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const handleCorrect = () => {
    setFeedback("correct");
    setTimeout(() => onCorrect(), 600);
  };

  const handleIncorrect = () => {
    setFeedback("incorrect");
    setTimeout(() => onIncorrect(), 600);
  };

  const handleBackClick = () => {
    if (!revealed) {
      setShowLeaveDialog(true);
    } else {
      onBack();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedElapsed = useMemo(() => {
    const minutes = Math.floor(elapsedSeconds / 60).toString().padStart(2, "0");
    const seconds = (elapsedSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [elapsedSeconds]);

  const teamColor = currentTeam === 1 ? "text-game-team1" : "text-game-team2";
  const teamBg = currentTeam === 1 ? "bg-game-team1/10 border-game-team1/20" : "bg-game-team2/10 border-game-team2/20";

  return (
    <div className={`relative flex min-h-[100dvh] flex-col overflow-hidden ${feedback === "incorrect" ? "animate-shake" : ""}`}>
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-background" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,hsl(var(--game-purple)/0.08)_0%,transparent_60%)]" />

      {/* Header */}
      <header className="relative z-10 flex items-center gap-3 px-4 py-4 sm:px-8 sm:py-5">
        <button
          onClick={handleBackClick}
          className="rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="flex flex-1 items-center justify-center">
          <div className="glass-panel flex items-center gap-2.5 rounded-xl px-5 py-2.5">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono text-lg font-medium tracking-wider text-foreground">
              {formattedElapsed}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-25"
            aria-label="Undo"
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <button
            onClick={onExit}
            className="rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Exit game"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Meta bar */}
      <div className="relative z-10 mx-4 mb-4 sm:mx-auto sm:w-full sm:max-w-[800px]">
        <div className="glass-panel flex items-center justify-between rounded-xl px-5 py-3">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground font-display">
            {category}
          </span>
          <span className="font-display text-sm font-black text-game-gold">
            {points} PTS
          </span>
          <span className={`rounded-lg border px-3 py-1 text-xs font-bold font-display ${teamColor} ${teamBg}`}>
            Team {currentTeam}
          </span>
        </div>
      </div>

      {/* Main content */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`w-full max-w-[800px] overflow-hidden rounded-2xl border border-border/50 bg-card shadow-[0_16px_48px_-12px_hsl(222_28%_4%/0.5)] ${
            feedback === "correct" ? "animate-pulse-glow" : ""
          }`}
        >
          {/* Question Image */}
          <div className="overflow-hidden">
            <img
              src={question.image}
              alt="Question"
              className="h-[30vh] min-h-[200px] w-full object-cover sm:h-[36vh] sm:min-h-[260px]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </div>

          {/* Question Text */}
          <div className="p-6 sm:p-8">
            <p className="text-center text-xl font-semibold leading-relaxed text-foreground sm:text-2xl font-display">
              {question.text}
            </p>

            {/* Answer Reveal */}
            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-xl border border-primary/15 bg-primary/5 p-6 text-center">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/50 font-display">
                      Answer
                    </p>
                    <p className="text-3xl font-black text-foreground font-display sm:text-4xl">
                      {question.answer}
                    </p>
                    {question.funFact && (
                      <p className="mt-3 text-sm italic text-muted-foreground">
                        {question.funFact}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Feedback Icon */}
        <AnimatePresence>
          {feedback === "correct" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-game-correct shadow-[0_0_24px_hsl(var(--game-correct)/0.4)]"
            >
              <Check className="h-7 w-7 text-white" />
            </motion.div>
          )}
          {feedback === "incorrect" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-game-incorrect shadow-[0_0_24px_hsl(var(--game-incorrect)/0.4)]"
            >
              <X className="h-7 w-7 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Action Footer */}
      <footer className="relative z-10 flex items-center justify-center gap-3 px-4 py-6 sm:py-8">
        {!revealed ? (
          <>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setRevealed(true)}
              className="flex items-center gap-2.5 rounded-2xl gradient-cta px-10 py-4 text-base font-bold text-white font-display shadow-[0_0_20px_-4px_hsl(var(--primary)/0.3)] transition-all hover:shadow-[0_0_28px_-4px_hsl(var(--primary)/0.4)] hover:brightness-110"
            >
              <Eye className="h-5 w-5" />
              Reveal Answer
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowSkipDialog(true)}
              className="glass-panel flex items-center gap-2 rounded-2xl px-7 py-4 text-base font-semibold text-muted-foreground font-display transition-colors hover:text-foreground"
            >
              <SkipForward className="h-4 w-4" />
              Skip
            </motion.button>
          </>
        ) : feedback === null ? (
          <>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleCorrect}
              className="flex items-center gap-2 rounded-2xl bg-game-correct px-10 py-4 text-base font-bold text-white font-display shadow-[0_0_20px_-4px_hsl(var(--game-correct)/0.3)] transition-all hover:brightness-110"
            >
              <Check className="h-5 w-5" />
              Correct
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleIncorrect}
              className="flex items-center gap-2 rounded-2xl bg-game-incorrect px-10 py-4 text-base font-bold text-white font-display shadow-[0_0_20px_-4px_hsl(var(--game-incorrect)/0.3)] transition-all hover:brightness-110"
            >
              <X className="h-5 w-5" />
              Incorrect
            </motion.button>
          </>
        ) : null}
      </footer>

      <SkipConfirmDialog
        open={showSkipDialog}
        onOpenChange={setShowSkipDialog}
        onConfirm={() => {
          setShowSkipDialog(false);
          onSkip();
        }}
      />

      <LeaveConfirmDialog
        open={showLeaveDialog}
        onOpenChange={setShowLeaveDialog}
        onConfirm={() => {
          setShowLeaveDialog(false);
          onBack();
        }}
      />
    </div>
  );
};
