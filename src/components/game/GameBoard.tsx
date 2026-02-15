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
    <div className="board-arcade-bg flex min-h-[100dvh] flex-col px-3 py-0.5 pb-[120px] sm:px-5 sm:py-1.5 md:px-8 md:py-1.5">
      <header className="mb-1 flex items-center justify-between gap-3 sm:mb-1.5">
        <div
          className={`team-turn-indicator rounded-full px-4 py-1.5 text-sm font-semibold font-display transition-colors ${
            currentTeam === 1
              ? "team-turn-team1 bg-game-team1/15 text-game-team1 ring-1 ring-game-team1/30"
              : "team-turn-team2 bg-game-team2/15 text-game-team2 ring-1 ring-game-team2/30"
          }`}
        >
          Team {currentTeam}'s Turn
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30"
            aria-label="Undo last action"
          >
            <Undo2 className="h-5 w-5" />
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

      <main className="flex flex-1 items-start justify-center">
        <section className="board-arena-frame w-full max-w-[1560px]">
          <div className="grid grid-cols-3 gap-5 md:gap-8">
            {categories.map((category, categoryIndex) => (
                <div key={category.name} className="flex flex-col gap-3 md:gap-4">
                  <div className="tileHeaderInteractive glass-surface flex h-30 flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-border/50 px-2 md:h-36">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg md:h-16 md:w-16">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                    <span className="px-1 text-center text-xs font-semibold uppercase leading-tight tracking-wider text-primary font-display sm:text-sm">
                      {category.name}
                    </span>
                  </div>

                {points.map((pointValue, pointIndex) => (
                  <PointTile
                    key={pointValue}
                    points={pointValue}
                    disabled={tiles[categoryIndex][pointIndex].used}
                    onClick={() => onTileClick(categoryIndex, pointIndex)}
                    delay={categoryIndex * 0.08 + pointIndex * 0.08}
                  />
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="fixed bottom-5 left-0 right-0 z-50 flex justify-center gap-6 px-3">
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
  const teamTextClass = team === 1 ? "text-game-team1" : "text-game-team2";
  const teamPanelClass =
    team === 1
      ? "border-game-team1/50 shadow-[0_0_14px_hsl(var(--game-team1)/0.28)]"
      : "border-game-team2/50 shadow-[0_0_14px_hsl(var(--game-team2)/0.28)]";
  const activeClass =
    team === 1
      ? "scale-[1.08] opacity-100 border-game-team1/70 score-pill-ring-glow score-pill-ring-team1 shadow-[0_0_24px_hsl(var(--game-team1)/0.55)]"
      : "scale-[1.08] opacity-100 border-game-team2/70 score-pill-ring-glow score-pill-ring-team2 shadow-[0_0_24px_hsl(var(--game-team2)/0.55)]";
  const inactiveClass = "scale-100 opacity-80";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`score-pill-shadow ${teamPanelClass} ${active ? activeClass : inactiveClass} flex min-w-[210px] items-center justify-center gap-3 rounded-2xl border bg-card/95 px-5 py-3 transition-all duration-200 ease-in-out ${
        active ? "" : "border-border/50"
      }`}
    >
      <span className={`text-sm font-semibold font-display ${teamTextClass}`}>
        Team {team}
      </span>

      <span className={`text-4xl tabular-nums text-foreground font-display ${active ? "font-black" : "font-extrabold"} ${team === 1 ? "score-number-team1" : "score-number-team2"}`}>
        {score.toLocaleString()}
      </span>

      {allowEdits && (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onAdjust(team, -100)}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-base font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95"
          >
            -
          </button>
          <button
            onClick={() => onAdjust(team, 100)}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-base font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95"
          >
            +
          </button>
        </div>
      )}
    </motion.div>
  );
};
