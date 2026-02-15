import { useEffect, useState, useMemo } from "react";
import { Search, Shuffle, Play, ChevronDown, X } from "lucide-react";
import { icons } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Category, CATEGORY_LIBRARY } from "@/data/categories";
import { Switch } from "@/components/ui/switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AgeGateDialog } from "./AgeGateDialog";

export interface GameOptions {
  allowScoreEdits: boolean;
  soundEffects: boolean;
  haptics: boolean;
  keepTurnOnCorrect: boolean;
  incorrectPenalty: boolean;
  includeAfterDark: boolean;
}

interface HomeScreenProps {
  onStartGame: (categories: Category[], options: GameOptions) => void;
}

type FilterKey = "all" | "popular" | "new" | "easy" | "medium" | "hard" | "afterDark";

const BASE_FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "popular", label: "Popular" },
  { key: "new", label: "New" },
  { key: "easy", label: "Easy" },
  { key: "medium", label: "Medium" },
  { key: "hard", label: "Hard" },
];

const CategoryIcon = ({ iconName, className }: { iconName: string; className?: string }) => {
  const LucideIcon = (icons as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
  if (!LucideIcon) return null;
  return <LucideIcon className={className} />;
};

const difficultyColors: Record<string, string> = {
  easy: "home-difficulty-tag home-difficulty-easy",
  medium: "home-difficulty-tag home-difficulty-medium",
  hard: "home-difficulty-tag home-difficulty-hard",
};

export const HomeScreen = ({ onStartGame }: HomeScreenProps) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selected, setSelected] = useState<Category[]>([]);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [ageGateConfirmed, setAgeGateConfirmed] = useState(false);
  const [showAgeGate, setShowAgeGate] = useState(false);
  const [showCounterFlash, setShowCounterFlash] = useState(false);
  const [options, setOptions] = useState<GameOptions>({
    allowScoreEdits: true,
    soundEffects: false,
    haptics: false,
    keepTurnOnCorrect: false,
    incorrectPenalty: true,
    includeAfterDark: false,
  });

  const filters = useMemo(() => {
    if (options.includeAfterDark) {
      return [...BASE_FILTERS, { key: "afterDark" as FilterKey, label: "After Dark 🔥" }];
    }
    return BASE_FILTERS;
  }, [options.includeAfterDark]);

  const availableCategories = useMemo(() => {
    if (options.includeAfterDark) return CATEGORY_LIBRARY;
    return CATEGORY_LIBRARY.filter((c) => !c.isAfterDark);
  }, [options.includeAfterDark]);

  const filtered = useMemo(() => {
    let cats = availableCategories;
    if (search) {
      const q = search.toLowerCase();
      cats = cats.filter((c) => c.name.toLowerCase().includes(q));
    }
    if (filter === "popular") cats = cats.filter((c) => c.isPopular);
    else if (filter === "new") cats = cats.filter((c) => c.isNew);
    else if (filter === "easy") cats = cats.filter((c) => c.difficulty === "easy");
    else if (filter === "medium") cats = cats.filter((c) => c.difficulty === "medium");
    else if (filter === "hard") cats = cats.filter((c) => c.difficulty === "hard");
    else if (filter === "afterDark") cats = cats.filter((c) => c.isAfterDark);
    return cats;
  }, [search, filter, availableCategories]);

  const toggleCategory = (cat: Category) => {
    setSelected((prev) => {
      const exists = prev.find((c) => c.id === cat.id);
      if (exists) return prev.filter((c) => c.id !== cat.id);
      if (prev.length >= 6) return prev;
      return [...prev, cat];
    });
  };

  const removeCategory = (id: string) => {
    setSelected((prev) => prev.filter((c) => c.id !== id));
  };

  const randomize = () => {
    const shuffled = [...availableCategories].sort(() => Math.random() - 0.5);
    setSelected(shuffled.slice(0, 6));
  };

  const handleAfterDarkToggle = (val: boolean) => {
    if (val && !ageGateConfirmed) {
      setShowAgeGate(true);
    } else {
      setOptions((p) => ({ ...p, includeAfterDark: val }));
      if (!val) {
        setSelected((prev) => prev.filter((c) => !c.isAfterDark));
        if (filter === "afterDark") setFilter("all");
      }
    }
  };

  const handleAgeGateConfirm = () => {
    setAgeGateConfirmed(true);
    setShowAgeGate(false);
    setOptions((p) => ({ ...p, includeAfterDark: true }));
  };

  const isSelected = (id: string) => selected.some((c) => c.id === id);
  const isSelectionFull = selected.length === 6;

  useEffect(() => {
    if (!isSelectionFull) return;
    setShowCounterFlash(true);
    const timer = setTimeout(() => setShowCounterFlash(false), 460);
    return () => clearTimeout(timer);
  }, [isSelectionFull]);

  return (
    <div className="home-arcade-bg flex min-h-[100dvh] flex-col px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="font-home-title text-5xl font-bold sm:text-7xl">
            <span className="home-title-glow text-white">Quiz Duel</span>
          </h1>
          <p className="font-home-subheading mt-2 text-base text-foreground/80">
            Pick 6 categories and start the match.
          </p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search categories…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="home-search-field font-home-ui w-full rounded-xl py-2.5 pl-10 pr-4 text-sm"
          />
        </div>

        {/* Filters */}
        <div className="mb-5 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`home-filter-pill font-home-ui rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                filter === f.key
                  ? f.key === "afterDark"
                    ? "home-filter-pill-active bg-game-pink border-game-pink"
                    : "home-filter-pill-active"
                  : ""
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="mb-3 flex items-center justify-between">
          <motion.span
            className={`home-counter-badge font-home-subheading text-base font-semibold ${
              isSelectionFull ? "home-counter-full" : ""
            } ${showCounterFlash ? "home-counter-flash" : ""}`}
            animate={isSelectionFull ? { scale: [1, 1.03, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            Selected: <span className="text-primary">{selected.length}</span> / 6
          </motion.span>
          <button
            onClick={randomize}
            className="home-filter-pill font-home-ui flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold"
          >
            <Shuffle className="h-3.5 w-3.5" />
            Randomize 6
          </button>
        </div>

        {/* Selected Row */}
        <AnimatePresence>
          {selected.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 flex flex-wrap gap-2 overflow-hidden"
            >
              {selected.map((cat) => (
                <motion.span
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium ${
                    cat.isAfterDark
                      ? "border-game-pink/30 bg-game-pink/10 text-game-pink"
                      : "border-primary/30 bg-primary/10 text-primary"
                  }`}
                >
                  {cat.name}
                  <button
                    onClick={() => removeCategory(cat.id)}
                    className="rounded-full p-0.5 transition-colors hover:bg-primary/20"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {selected.length === 0 && (
          <p className="mb-4 text-center text-xs text-muted-foreground">
            Select 6 categories to start
          </p>
        )}

        {/* Category Grid */}
        <div className="mb-6 grid auto-rows-fr grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <Search className="mb-2 h-8 w-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">No categories found</p>
            </div>
          ) : (
            filtered.map((cat, i) => {
              const sel = isSelected(cat.id);
              const full = selected.length >= 6 && !sel;
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  disabled={full}
                  onClick={() => toggleCategory(cat)}
                  className={`home-category-card group relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-xl text-left ${
                    sel
                      ? cat.isAfterDark
                        ? "border-game-pink/70 shadow-[0_0_16px_hsl(var(--game-pink)/0.45)]"
                        : "border-primary/70 shadow-[0_0_16px_hsl(var(--primary)/0.4)]"
                      : full
                      ? "cursor-not-allowed opacity-45"
                      : ""
                  }`}
                >
                  {/* Category Image */}
                  <div className="h-28 w-full overflow-hidden sm:h-32">
                    <img
                      src={cat.categoryImage}
                      alt={cat.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2 p-4">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        sel
                          ? cat.isAfterDark
                            ? "bg-game-pink/20 text-game-pink"
                            : "bg-primary/20 text-primary"
                          : "bg-black/20 text-white/85"
                      }`}
                    >
                      <CategoryIcon iconName={cat.icon} className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-home-ui block truncate text-base font-bold text-foreground">
                        {cat.name}
                      </span>
                                            <span className="flex items-center gap-1.5 text-[10px] text-white/75">
                        <span className={difficultyColors[cat.difficulty]}>
                          {cat.difficulty}
                        </span>
                        {cat.isNew && (
                          <span className="rounded bg-game-purple/25 px-1.5 py-1 text-[10px] font-bold text-white">New</span>
                        )}
                        {cat.isPopular && (
                          <span className="rounded bg-white/15 px-1.5 py-1 text-[10px] font-bold text-white">Hot</span>
                        )}
                        {cat.isAfterDark && (
                          <span className="rounded bg-game-pink/30 px-1.5 py-1 text-[10px] font-bold text-white">18+</span>
                        )}
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })
          )}
        </div>

        {/* Game Options */}
        <Collapsible open={optionsOpen} onOpenChange={setOptionsOpen} className="mb-6">
          <CollapsibleTrigger className="font-home-subheading flex w-full items-center justify-between rounded-xl border border-border/50 bg-secondary px-4 py-3 text-base font-semibold text-muted-foreground transition-colors hover:text-foreground">
            <span>Game Options</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${optionsOpen ? "rotate-180" : ""}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 rounded-xl border border-border/50 bg-secondary/50 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-home-subheading text-sm text-muted-foreground">Points</span>
              <span className="font-home-ui text-sm font-semibold text-foreground">200 / 400 / 600</span>
            </div>
            <OptionRow
              label="Allow score edits (+/−)"
              checked={options.allowScoreEdits}
              onChange={(v) => setOptions((p) => ({ ...p, allowScoreEdits: v }))}
            />
            <OptionRow
              label="Incorrect answer penalty"
              checked={options.incorrectPenalty}
              onChange={(v) => setOptions((p) => ({ ...p, incorrectPenalty: v }))}
            />
            <OptionRow
              label="Sound effects"
              checked={options.soundEffects}
              onChange={(v) => setOptions((p) => ({ ...p, soundEffects: v }))}
            />
            <OptionRow
              label="Haptics"
              checked={options.haptics}
              onChange={(v) => setOptions((p) => ({ ...p, haptics: v }))}
            />
            <OptionRow
              label="Keep turn on correct answer"
              checked={options.keepTurnOnCorrect}
              onChange={(v) => setOptions((p) => ({ ...p, keepTurnOnCorrect: v }))}
            />
            <OptionRow
              label="Include After Dark (18+)"
              checked={options.includeAfterDark}
              onChange={handleAfterDarkToggle}
            />
          </CollapsibleContent>
        </Collapsible>

        {/* Start Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={selected.length !== 6}
          onClick={() => onStartGame(selected, options)}
          className={`font-home-ui flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-bold transition-all ${
            selected.length === 6
              ? "party-gradient text-primary-foreground hover:brightness-110 neon-glow"
              : "cursor-not-allowed bg-secondary text-muted-foreground"
          }`}
        >
          <Play className="h-4 w-4" />
          Start Game
        </motion.button>
      </div>

      <AgeGateDialog
        open={showAgeGate}
        onOpenChange={setShowAgeGate}
        onConfirm={handleAgeGateConfirm}
      />
    </div>
  );
};

const OptionRow = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-muted-foreground">{label}</span>
    <Switch checked={checked} onCheckedChange={onChange} />
  </div>
);

