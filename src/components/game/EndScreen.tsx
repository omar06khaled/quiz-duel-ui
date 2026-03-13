import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, ArrowLeft, Home } from "lucide-react";

interface EndScreenProps {
  scores: { team1: number; team2: number };
  correctCount: number;
  incorrectCount: number;
  onPlayAgain: () => void;
  onChangeCategories: () => void;
}

const CONFETTI_COLORS = [
  "hsl(174, 72%, 50%)",
  "hsl(330, 80%, 65%)",
  "hsl(270, 60%, 60%)",
  "hsl(25, 90%, 58%)",
  "hsl(45, 90%, 55%)",
  "hsl(200, 90%, 62%)",
];

const ConfettiBurst = () => {
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.8,
      size: Math.random() * 8 + 4,
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
          transition={{ duration: 2, delay: p.delay, ease: "easeIn" }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.size > 8 ? "50%" : "2px",
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
    const timer = setTimeout(() => setShowConfetti(false), 2500);
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
      : "text-white";

  return (
    <div className="glass-page-bg flex min-h-[100dvh] flex-col items-center justify-center px-4 py-8">
      {showConfetti && <ConfettiBurst />}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-panel-strong w-full max-w-md rounded-2xl p-6 text-center sm:p-8"
      >
        <h2 className="mb-2 font-display text-lg font-semibold uppercase tracking-widest text-muted-foreground">
          Game Over
        </h2>
        <h1 className={`mb-8 font-display text-4xl font-bold sm:text-5xl ${winnerColor}`}>
          {winner}
        </h1>

        {/* Score Pills */}
        <div className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <ScorePill team={1} score={scores.team1} isWinner={scores.team1 > scores.team2} />
          <ScorePill team={2} score={scores.team2} isWinner={scores.team2 > scores.team1} />
        </div>

        {/* Stats */}
        <div className="mb-10 flex justify-center gap-6">
          <div className="text-center">
            <span className="block font-display text-2xl font-bold text-game-correct">{correctCount}</span>
            <span className="text-xs text-white/70">Correct</span>
          </div>
          <div className="text-center">
            <span className="block font-display text-2xl font-bold text-game-incorrect">{incorrectCount}</span>
            <span className="text-xs text-white/70">Incorrect</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onPlayAgain}
            className="glass-action-primary flex w-full items-center justify-center gap-2 rounded-xl py-3 font-display text-sm font-semibold text-primary-foreground transition-all"
          >
            <RotateCcw className="h-4 w-4" />
            Play Again
          </button>
          <button
            onClick={onChangeCategories}
            className="glass-action flex w-full items-center justify-center gap-2 rounded-xl py-3 font-display text-sm font-semibold text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Change Categories
          </button>
          <button
            onClick={onChangeCategories}
            className="glass-action flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm text-white/78 transition-colors hover:text-white"
          >
            <Home className="h-4 w-4" />
            Exit to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const ScorePill = ({
  team,
  score,
  isWinner,
}: {
  team: 1 | 2;
  score: number;
  isWinner: boolean;
}) => {
  const color = team === 1 ? "text-game-team1" : "text-game-team2";
  return (
    <div
      className={`glass-panel score-pill-shadow flex items-center gap-3 rounded-2xl border px-5 py-3 ${
        isWinner ? "glass-border-glow" : "border-border/50"
      }`}
    >
      <span className={`text-sm font-semibold font-display ${color}`}>Team {team}</span>
      <span className="font-display text-xl font-bold tabular-nums text-foreground">
        {score.toLocaleString()}
      </span>
    </div>
  );
};
