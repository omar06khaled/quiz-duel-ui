import { useEffect, useState, useMemo } from "react";
import { Search, Shuffle, Play, ChevronDown, X, Sparkles } from "lucide-react";
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
    <div className="home-bg flex min-h-[100dvh] flex-col px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-game-gold animate-float" />
            <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Party Trivia
            </span>
            <Sparkles className="h-5 w-5 text-game-gold animate-float" style={{ animationDelay: "1s" }} />
          </div>
          <h1 className="font-display text-6xl font-black tracking-tight sm:text-8xl">
            <span className="gradient-cta-text">Quiz Duel</span>
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Choose 6 categories • Two teams • One winner
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="relative mb-5"
        >
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search categories…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="home-search-field w-full rounded-xl py-3 pl-11 pr-4 text-sm"
          />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mb-6 flex flex-wrap gap-2"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`home-filter-pill rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                filter === f.key
                  ? f.key === "afterDark"
                    ? "home-filter-pill-active !border-game-pink/60 !bg-game-pink/15 !text-game-pink !shadow-[0_0_12px_hsl(var(--game-pink)/0.2)]"
                    : "home-filter-pill-active"
                  : ""
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Counter + Randomize */}
        <div className="mb-4 flex items-center justify-between">
          <motion.span
            className={`home-counter-badge text-sm font-semibold font-display ${
              isSelectionFull ? "home-counter-full" : ""
            } ${showCounterFlash ? "home-counter-flash" : ""}`}
            animate={isSelectionFull ? { scale: [1, 1.04, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            {selected.length} / 6 selected
          </motion.span>
          <button
            onClick={randomize}
            className="home-filter-pill flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold"
          >
            <Shuffle className="h-3.5 w-3.5" />
            Randomize
          </button>
        </div>

        {/* Selected Chips */}
        <AnimatePresence>
          {selected.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-5 flex flex-wrap gap-2 overflow-hidden"
            >
              {selected.map((cat) => (
                <motion.span
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  className={`glass-panel flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold font-display ${
                    cat.isAfterDark
                      ? "!border-game-pink/30 text-game-pink"
                      : "text-primary"
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
          <p className="mb-5 text-center text-sm text-muted-foreground/60">
            Tap categories below to build your lineup
          </p>
        )}

        {/* Category Grid */}
        <div className="mb-8 grid auto-rows-fr grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
              <Search className="mb-3 h-8 w-8 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No categories found</p>
            </div>
          ) : (
            filtered.map((cat, i) => {
              const sel = isSelected(cat.id);
              const full = selected.length >= 6 && !sel;
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  disabled={full}
                  onClick={() => toggleCategory(cat)}
                  className={`home-category-card group relative flex h-full min-h-[210px] flex-col overflow-hidden rounded-2xl text-left ${
                    sel
                      ? cat.isAfterDark
                        ? "!border-game-pink/50 ring-1 ring-game-pink/30"
                        : "!border-primary/50 ring-1 ring-primary/30"
                      : full
                      ? "cursor-not-allowed opacity-35"
                      : ""
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-28 w-full overflow-hidden sm:h-32">
                    <img
                      src={cat.categoryImage}
                      alt={cat.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                    {/* Selected check */}
                    {sel && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary"
                      >
                        <svg className="h-4 w-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 items-start gap-2.5 p-3.5">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        sel
                          ? cat.isAfterDark
                            ? "bg-game-pink/15 text-game-pink"
                            : "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <CategoryIcon iconName={cat.icon} className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-foreground font-display">
                        {cat.name}
                      </span>
                      <div className="mt-1 flex flex-wrap items-center gap-1.5">
                        <span className={difficultyColors[cat.difficulty]}>
                          {cat.difficulty}
                        </span>
                        {cat.isNew && (
                          <span className="home-difficulty-tag bg-game-purple/20 text-game-purple">New</span>
                        )}
                        {cat.isPopular && (
                          <span className="home-difficulty-tag bg-game-gold/20 text-game-gold">Hot</span>
                        )}
                        {cat.isAfterDark && (
                          <span className="home-difficulty-tag bg-game-pink/20 text-game-pink">18+</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })
          )}
        </div>

        {/* Game Options */}
        <Collapsible open={optionsOpen} onOpenChange={setOptionsOpen} className="mb-6">
          <CollapsibleTrigger className="glass-panel flex w-full items-center justify-between rounded-xl px-5 py-3.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground font-display">
            <span>Game Options</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${optionsOpen ? "rotate-180" : ""}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-1 rounded-xl border border-border/50 bg-card/80 p-5">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Points per tier</span>
              <span className="font-mono text-sm font-medium text-foreground">200 / 400 / 600</span>
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
          className={`flex w-full items-center justify-center gap-2.5 rounded-2xl py-4 text-base font-bold transition-all font-display ${
            selected.length === 6
              ? "gradient-cta text-white shadow-[0_0_24px_-4px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_32px_-4px_hsl(var(--primary)/0.5)] hover:brightness-110"
              : "cursor-not-allowed bg-secondary text-muted-foreground"
          }`}
        >
          <Play className="h-5 w-5" />
          {selected.length === 6 ? "Start Game" : `Select ${6 - selected.length} more`}
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
  <div className="flex items-center justify-between py-2">
    <span className="text-sm text-muted-foreground">{label}</span>
    <Switch checked={checked} onCheckedChange={onChange} />
  </div>
);
