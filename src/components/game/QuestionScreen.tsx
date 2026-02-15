import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, LogOut, Undo2, Eye, SkipForward, Check, X, Timer } from "lucide-react";
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
    const minutes = Math.floor(elapsedSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (elapsedSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [elapsedSeconds]);

  const teamColor = currentTeam === 1 ? "text-game-team1" : "text-game-team2";

  return (
    <div className={`relative flex min-h-[100dvh] flex-col overflow-hidden px-4 py-4 sm:px-8 sm:py-5 ${feedback === "incorrect" ? "animate-shake" : ""}`}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,hsl(248_30%_10%)_0%,hsl(246_30%_8%)_56%,hsl(244_34%_6%)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(62%_54%_at_50%_54%,hsl(var(--game-pink)/0.16)_0%,hsl(var(--game-team1)/0.09)_38%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(110%_96%_at_50%_50%,transparent_46%,hsl(246_34%_4%/0.72)_100%)]" />
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0.28, scale: 1 }}
        animate={{ opacity: [0.24, 0.34, 0.24], scale: [1, 1.03, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-full w-full bg-[radial-gradient(46%_40%_at_50%_56%,hsl(var(--game-pink)/0.14)_0%,transparent_72%)]" />
      </motion.div>

      <header className="relative z-10 mb-4 flex items-center gap-3">
        <button
          onClick={handleBackClick}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center gap-3 rounded-xl border border-white/25 bg-[linear-gradient(125deg,hsl(var(--game-team1)/0.24),hsl(var(--game-pink)/0.28),hsl(var(--game-purple)/0.22))] px-7 py-3 shadow-[0_0_20px_hsl(var(--game-pink)/0.35)]">
            <Timer className="h-8 w-8 text-white/85" />
            <span className="font-home-title text-4xl leading-none tracking-[0.06em] text-white">
              {formattedElapsed}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30"
            aria-label="Undo"
          >
            <Undo2 className="h-4 w-4" />
          </button>
          <button
            onClick={onExit}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Exit game"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="relative z-10 mx-auto mb-4 w-full max-w-[920px] rounded-xl border border-white/18 bg-card/45 px-4 py-2.5 backdrop-blur-sm">
        <div className="grid grid-cols-3 items-center gap-2 text-center">
          <span className="font-home-subheading text-sm font-semibold uppercase tracking-wider text-white/90">
            {category}
          </span>
          <span className="font-home-subheading text-sm font-extrabold tracking-wide text-game-gold">
            {points} PTS
          </span>
          <span className={`font-home-subheading text-sm font-semibold tracking-wide ${teamColor}`}>
            Team {currentTeam}
          </span>
        </div>
      </div>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={`glass-surface mx-auto w-full max-w-[860px] rounded-2xl border border-white/14 bg-card/85 p-6 shadow-[0_20px_60px_-20px_hsl(248_44%_4%/0.9),0_0_28px_hsl(var(--game-pink)/0.2)] sm:p-8 lg:p-10 ${
            feedback === "correct" ? "animate-pulse-glow" : ""
          }`}
        >
          <div className="mb-6 overflow-hidden rounded-xl">
            <img
              src={question.image}
              alt="Question"
              className="h-[36vh] min-h-[220px] w-full object-cover sm:h-[40vh] sm:min-h-[280px]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </div>

          <p className="text-center text-2xl font-medium leading-relaxed text-foreground sm:text-3xl font-display">
            {question.text}
          </p>

          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 overflow-hidden"
              >
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center sm:p-7">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary/70 font-display">
                    Answer
                  </p>
                  <p className="text-4xl font-black text-foreground font-display sm:text-5xl">
                    {question.answer}
                  </p>
                  {question.funFact && (
                    <p className="mt-4 text-base italic text-muted-foreground">
                      {question.funFact}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {feedback === "correct" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-game-correct"
            >
              <Check className="h-6 w-6 text-foreground" />
            </motion.div>
          )}
          {feedback === "incorrect" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-game-incorrect"
            >
              <X className="h-6 w-6 text-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 mt-5 flex items-center justify-center gap-3 sm:mt-7">
        {!revealed ? (
          <>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setRevealed(true)}
              className="flex items-center gap-2 rounded-xl bg-[linear-gradient(125deg,hsl(var(--game-team1)),hsl(var(--game-pink))_58%,hsl(var(--game-purple)))] px-10 py-4 text-lg font-bold text-white font-display shadow-[0_0_18px_hsl(var(--game-pink)/0.4)] transition-all hover:brightness-110 hover:shadow-[0_0_26px_hsl(var(--game-pink)/0.58)]"
            >
              <Eye className="h-4 w-4" />
              Reveal Answer
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowSkipDialog(true)}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-card/50 px-8 py-4 text-lg font-semibold text-white/78 font-display transition-colors hover:bg-card/65 hover:text-white"
            >
              <SkipForward className="h-4 w-4" />
              Skip
            </motion.button>
          </>
        ) : feedback === null ? (
          <>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleCorrect}
              className="rounded-xl bg-game-correct px-10 py-4 text-lg font-bold text-foreground font-display transition-all hover:brightness-110"
            >
              Correct
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleIncorrect}
              className="rounded-xl bg-game-incorrect px-10 py-4 text-lg font-bold text-foreground font-display transition-all hover:brightness-110"
            >
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
