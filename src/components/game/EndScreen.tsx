import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, ArrowLeft, Trophy, Target, XCircle } from "lucide-react";

interface EndScreenProps {
  scores: { team1: number; team2: number };
  correctCount: number;
  incorrectCount: number;
  onPlayAgain: () => void;
  onChangeCategories: () => void;
}

const CONFETTI_COLORS = [
  "hsl(190, 95%, 48%)",
  "hsl(328, 80%, 58%)",
  "hsl(265, 70%, 58%)",
  "hsl(42, 92%, 56%)",
  "hsl(158, 64%, 42%)",
  "hsl(24, 96%, 56%)",
];

const ConfettiBurst = () => {
  const [particles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.6,
      size: Math.random() * 8 + 3,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotation: Math.random() * 360,
    }))
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: "100vh", opacity: 0, rotate: p.rotation + 720 }}
          transition={{ duration: 2.2, delay: p.delay, ease: "easeIn" }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.size > 6 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
};

export const EndScreen = ({
  scores,
  correctCount,
  incorrectCount,
  onPlayAgain,
  onChangeCategories,
}: EndScreenProps) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  const winner =
    scores.team1 > scores.team2
      ? "Team 1 Wins!"
      : scores.team2 > scores.team1
      ? "Team 2 Wins!"
      : "It's a Tie!";

  const winnerColor =
    scores.team1 > scores.team2
      ? "text-game-team1"
      : scores.team2 > scores.team1
      ? "text-game-team2"
      : "gradient-cta-text";

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 py-8">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-background" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_40%,hsl(var(--game-purple)/0.1)_0%,transparent_60%)]" />

      {showConfetti && <ConfettiBurst />}

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md text-center"
      >
        {/* Trophy */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-game-gold/15"
        >
          <Trophy className="h-8 w-8 text-game-gold" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-2 font-display text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground"
        >
          Game Over
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mb-8 font-display text-5xl font-black sm:text-6xl ${winnerColor}`}
        >
          {winner}
        </motion.h1>

        {/* Score Pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <FinalScorePill team={1} score={scores.team1} isWinner={scores.team1 > scores.team2} />
          <FinalScorePill team={2} score={scores.team2} isWinner={scores.team2 > scores.team1} />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-10 flex justify-center gap-8"
        >
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-game-correct" />
            <div className="text-left">
              <span className="block font-display text-2xl font-black text-game-correct">{correctCount}</span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Correct</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-game-incorrect" />
            <div className="text-left">
              <span className="block font-display text-2xl font-black text-game-incorrect">{incorrectCount}</span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Incorrect</span>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col gap-3"
        >
          <button
            onClick={onPlayAgain}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl gradient-cta py-4 font-display text-sm font-bold text-white transition-all shadow-[0_0_20px_-4px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_28px_-4px_hsl(var(--primary)/0.4)] hover:brightness-110"
          >
            <RotateCcw className="h-4 w-4" />
            Play Again
          </button>
          <button
            onClick={onChangeCategories}
            className="glass-panel flex w-full items-center justify-center gap-2.5 rounded-2xl py-3.5 font-display text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            Change Categories
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

const FinalScorePill = ({
  team,
  score,
  isWinner,
}: {
  team: 1 | 2;
  score: number;
  isWinner: boolean;
}) => {
  const labelColor = team === 1 ? "text-game-team1" : "text-game-team2";
  const pillClass = team === 1 ? "score-pill-team1" : "score-pill-team2";

  return (
    <div
      className={`glass-panel ${pillClass} ${
        isWinner ? "score-pill-active ring-1 ring-current/20" : ""
      } flex items-center gap-3 rounded-2xl px-6 py-4`}
    >
      <span className={`text-xs font-bold uppercase tracking-[0.12em] font-display ${labelColor}`}>
        Team {team}
      </span>
      <span className={`font-display text-2xl font-black tabular-nums ${team === 1 ? "score-number-team1" : "score-number-team2"}`}>
        {score.toLocaleString()}
      </span>
    </div>
  );
};
