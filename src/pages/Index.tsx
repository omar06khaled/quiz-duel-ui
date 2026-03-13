import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HomeScreen, GameOptions } from "@/components/game/HomeScreen";
import { GameBoard } from "@/components/game/GameBoard";
import { QuestionScreen } from "@/components/game/QuestionScreen";
import { EndScreen } from "@/components/game/EndScreen";
import { ExitConfirmDialog } from "@/components/game/ExitConfirmDialog";
import { POINTS, type PlayableCategory, type PlayableQuestion } from "@/lib/content";

export interface TileState {
  categoryIndex: number;
  pointIndex: number;
  points: number;
  used: boolean;
}

interface UndoEntry {
  type: "answer" | "scoreAdjust";
  prevScores: { team1: number; team2: number };
  prevTeam: 1 | 2;
  prevTiles: TileState[][];
  prevCorrectCount: number;
  prevIncorrectCount: number;
}

type Screen = "home" | "board" | "question" | "end";

const initTiles = (): TileState[][] =>
  Array.from({ length: 6 }, (_, categoryIndex) =>
    POINTS.map((points, pointIndex) => ({
      categoryIndex,
      pointIndex,
      points,
      used: false,
    }))
  );

const deepCopyTiles = (tiles: TileState[][]): TileState[][] =>
  tiles.map((column) => column.map((tile) => ({ ...tile })));

const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } },
};

const Index = () => {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedCategories, setSelectedCategories] = useState<PlayableCategory[]>([]);
  const [gameOptions, setGameOptions] = useState<GameOptions>({
    allowScoreEdits: true,
    soundEffects: false,
    haptics: false,
    keepTurnOnCorrect: false,
    incorrectPenalty: true,
    includeAfterDark: false,
  });
  const [currentTeam, setCurrentTeam] = useState<1 | 2>(1);
  const [scores, setScores] = useState({ team1: 0, team2: 0 });
  const [tiles, setTiles] = useState<TileState[][]>(initTiles());
  const [activeTile, setActiveTile] = useState<{ categoryIndex: number; pointIndex: number } | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<PlayableQuestion | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [undoStack, setUndoStack] = useState<UndoEntry[]>([]);
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<string>>(new Set());

  const pushUndo = useCallback(() => {
    setUndoStack((prev) => {
      const entry: UndoEntry = {
        type: "answer",
        prevScores: { ...scores },
        prevTeam: currentTeam,
        prevTiles: deepCopyTiles(tiles),
        prevCorrectCount: correctCount,
        prevIncorrectCount: incorrectCount,
      };
      const next = [...prev, entry];
      if (next.length > 20) next.shift();
      return next;
    });
  }, [scores, currentTeam, tiles, correctCount, incorrectCount]);

  const handleUndo = useCallback(() => {
    setUndoStack((prev) => {
      if (prev.length === 0) return prev;
      const next = [...prev];
      const entry = next.pop();

      if (!entry) {
        return prev;
      }

      setScores(entry.prevScores);
      setCurrentTeam(entry.prevTeam);
      setTiles(entry.prevTiles);
      setCorrectCount(entry.prevCorrectCount);
      setIncorrectCount(entry.prevIncorrectCount);
      return next;
    });
  }, []);

  const resetGame = useCallback(() => {
    setTiles(initTiles());
    setScores({ team1: 0, team2: 0 });
    setCurrentTeam(1);
    setActiveTile(null);
    setActiveQuestion(null);
    setCorrectCount(0);
    setIncorrectCount(0);
    setUndoStack([]);
    setUsedQuestionIds(new Set());
  }, []);

  const pickQuestion = useCallback(
    (categoryIndex: number, pointIndex: number): PlayableQuestion | null => {
      const category = selectedCategories[categoryIndex];
      if (!category) return null;

      const points = POINTS[pointIndex];
      const pool = category.questions[points];
      if (!pool || pool.length === 0) return null;

      const available = pool.filter((question) => !usedQuestionIds.has(question.id));
      const source = available.length > 0 ? available : pool;
      const picked = source[Math.floor(Math.random() * source.length)];
      setUsedQuestionIds((prev) => new Set(prev).add(picked.id));
      return picked;
    },
    [selectedCategories, usedQuestionIds]
  );

  const handleStartGame = (categories: PlayableCategory[], options: GameOptions) => {
    setSelectedCategories(categories);
    setGameOptions(options);
    resetGame();
    setScreen("board");
  };

  const handleTileClick = (categoryIndex: number, pointIndex: number) => {
    const question = pickQuestion(categoryIndex, pointIndex);
    if (!question) return;
    setActiveTile({ categoryIndex, pointIndex });
    setActiveQuestion(question);
    setScreen("question");
  };

  const handleAnswer = (correct: boolean) => {
    if (!activeTile) return;
    const { categoryIndex, pointIndex } = activeTile;
    const points = POINTS[pointIndex];

    pushUndo();

    setTiles((prev) => {
      const next = prev.map((column) => column.map((tile) => ({ ...tile })));
      next[categoryIndex][pointIndex].used = true;
      return next;
    });

    if (correct) {
      setScores((prev) => {
        const key = currentTeam === 1 ? "team1" : "team2";
        return { ...prev, [key]: prev[key] + points };
      });
      setCorrectCount((count) => count + 1);
    } else {
      setIncorrectCount((count) => count + 1);
      if (gameOptions.incorrectPenalty) {
        setScores((prev) => {
          const key = currentTeam === 1 ? "team1" : "team2";
          return { ...prev, [key]: prev[key] - points };
        });
      }
    }

    if (!correct || !gameOptions.keepTurnOnCorrect) {
      setCurrentTeam((team) => (team === 1 ? 2 : 1));
    }

    setActiveTile(null);
    setActiveQuestion(null);

    setTiles((prev) => {
      const allUsed = prev.every((column) =>
        column.every(
          (tile) => tile.used || (tile.categoryIndex === categoryIndex && tile.pointIndex === pointIndex)
        )
      );

      if (allUsed) {
        setTimeout(() => setScreen("end"), 300);
      } else {
        setScreen("board");
      }

      return prev;
    });
  };

  const handleSkip = () => {
    setActiveTile(null);
    setActiveQuestion(null);
    setScreen("board");
  };

  const handleBack = () => {
    setActiveTile(null);
    setActiveQuestion(null);
    setScreen("board");
  };

  const handleScoreAdjust = (team: 1 | 2, delta: number) => {
    pushUndo();
    const key = team === 1 ? "team1" : "team2";
    setScores((prev) => ({ ...prev, [key]: prev[key] + delta }));
  };

  const handleExitConfirm = () => {
    setShowExitDialog(false);
    resetGame();
    setScreen("home");
  };

  const handlePlayAgain = () => {
    resetGame();
    setScreen("board");
  };

  const categories = selectedCategories.map((category) => ({
    name: category.name,
    image: category.categoryImage,
  }));

  return (
    <>
      <AnimatePresence mode="wait">
        {screen === "home" && (
          <motion.div key="home" {...pageVariants}>
            <HomeScreen onStartGame={handleStartGame} />
          </motion.div>
        )}
        {screen === "board" && (
          <motion.div key="board" {...pageVariants}>
            <GameBoard
              categories={categories}
              points={[...POINTS]}
              tiles={tiles}
              currentTeam={currentTeam}
              scores={scores}
              onTileClick={handleTileClick}
              onScoreAdjust={handleScoreAdjust}
              onExit={() => setShowExitDialog(true)}
              onUndo={handleUndo}
              canUndo={undoStack.length > 0}
              allowScoreEdits={gameOptions.allowScoreEdits}
            />
          </motion.div>
        )}
        {screen === "question" && activeTile && activeQuestion && (
          <motion.div key="question" {...pageVariants}>
            <QuestionScreen
              category={selectedCategories[activeTile.categoryIndex]?.name ?? ""}
              points={POINTS[activeTile.pointIndex]}
              question={activeQuestion}
              currentTeam={currentTeam}
              onCorrect={() => handleAnswer(true)}
              onIncorrect={() => handleAnswer(false)}
              onSkip={handleSkip}
              onBack={handleBack}
              onExit={() => setShowExitDialog(true)}
              onUndo={handleUndo}
              canUndo={undoStack.length > 0}
            />
          </motion.div>
        )}
        {screen === "end" && (
          <motion.div key="end" {...pageVariants}>
            <EndScreen
              scores={scores}
              correctCount={correctCount}
              incorrectCount={incorrectCount}
              onPlayAgain={handlePlayAgain}
              onChangeCategories={() => {
                resetGame();
                setScreen("home");
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ExitConfirmDialog
        open={showExitDialog}
        onOpenChange={setShowExitDialog}
        onConfirm={handleExitConfirm}
      />
    </>
  );
};

export default Index;
