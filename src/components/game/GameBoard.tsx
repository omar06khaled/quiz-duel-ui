import { LogOut, Undo2 } from "lucide-react";
import { TileState } from "@/pages/Index";
import { PointTile } from "./PointTile";
import { motion } from "framer-motion";

interface CategoryInfo {
  name: string;
  image: string;
}

interface GameBoardProps {
  categories: CategoryInfo[];
  points: number[];
  tiles: TileState[][];
  currentTeam: 1 | 2;
  scores: { team1: number; team2: number };
  onTileClick: (categoryIndex: number, pointIndex: number) => void;
  onScoreAdjust: (team: 1 | 2, delta: number) => void;
  onExit: () => void;
  onUndo: () => void;
  canUndo: boolean;
  allowScoreEdits: boolean;
}

export const GameBoard = ({
  categories,
  points,
  tiles,
  currentTeam,
  scores,
  onTileClick,
  onScoreAdjust,
  onExit,
  onUndo,
  canUndo,
  allowScoreEdits,
}: GameBoardProps) => {
  return (
    <div className="board-bg flex min-h-[100dvh] flex-col px-3 py-2 pb-[130px] sm:px-6 sm:py-3 md:px-8">
      {/* Header */}
      <header className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          className={`team-turn-indicator rounded-xl px-5 py-2.5 text-sm font-bold font-display transition-colors ${
            currentTeam === 1
              ? "team-turn-team1 bg-game-team1/10 text-game-team1 border border-game-team1/25"
              : "team-turn-team2 bg-game-team2/10 text-game-team2 border border-game-team2/25"
          }`}
        >
          Team {currentTeam}'s Turn
        </motion.div>
        <div className="flex items-center gap-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-25"
            aria-label="Undo last action"
          >
            <Undo2 className="h-5 w-5" />
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

      {/* Board */}
      <main className="flex flex-1 items-start justify-center">
        <section className="board-arena-frame w-full max-w-[1400px]">
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {categories.map((category, categoryIndex) => (
              <div key={category.name} className="flex flex-col gap-3 md:gap-4">
                {/* Category Header */}
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.1 }}
                  className="category-header-card flex h-28 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl px-3 md:h-32"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border/30 md:h-14 md:w-14">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <span className="px-1 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground font-display sm:text-xs">
                    {category.name}
                  </span>
                </motion.div>

                {/* Point Tiles */}
                {points.map((pointValue, pointIndex) => (
                  <PointTile
                    key={pointValue}
                    points={pointValue}
                    disabled={tiles[categoryIndex][pointIndex].used}
                    onClick={() => onTileClick(categoryIndex, pointIndex)}
                    delay={categoryIndex * 0.06 + pointIndex * 0.06}
                  />
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Score Footer */}
      <footer className="fixed bottom-5 left-0 right-0 z-50 flex justify-center gap-4 px-3 sm:gap-6">
        <ScorePill team={1} score={scores.team1} active={currentTeam === 1} onAdjust={onScoreAdjust} allowEdits={allowScoreEdits} />
        <ScorePill team={2} score={scores.team2} active={currentTeam === 2} onAdjust={onScoreAdjust} allowEdits={allowScoreEdits} />
      </footer>
    </div>
  );
};

interface ScorePillProps {
  team: 1 | 2;
  score: number;
  active: boolean;
  onAdjust: (team: 1 | 2, delta: number) => void;
  allowEdits: boolean;
}

const ScorePill = ({ team, score, active, onAdjust, allowEdits }: ScorePillProps) => {
  const teamClass = team === 1 ? "score-pill-team1" : "score-pill-team2";
  const labelColor = team === 1 ? "text-game-team1" : "text-game-team2";
  const scoreColor = team === 1 ? "score-number-team1" : "score-number-team2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: team * 0.1 }}
      className={`glass-panel ${teamClass} ${
        active ? "score-pill-active scale-[1.05]" : "opacity-70 scale-100"
      } flex min-w-[190px] items-center justify-center gap-3 rounded-2xl px-5 py-3.5 transition-all duration-300 sm:min-w-[220px]`}
    >
      <div className="flex flex-col items-center">
        <span className={`text-[10px] font-bold uppercase tracking-[0.15em] font-display ${labelColor}`}>
          Team {team}
        </span>
        <span className={`font-display text-3xl font-black tabular-nums sm:text-4xl ${scoreColor}`}>
          {score.toLocaleString()}
        </span>
      </div>

      {allowEdits && (
        <div className="flex flex-col gap-0.5">
          <button
            onClick={() => onAdjust(team, 100)}
            className="flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-90"
          >
            +
          </button>
          <button
            onClick={() => onAdjust(team, -100)}
            className="flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-90"
          >
            −
          </button>
        </div>
      )}
    </motion.div>
  );
};
