import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Shuffle, Play, ChevronDown, X } from "lucide-react";
import { icons } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { fetchApprovedCategoryLibrary, type PlayableCategory } from "@/lib/content";
import { useSupabaseAuth } from "@/hooks/use-supabase-auth";
import { getMyProfile } from "@/lib/community";
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
  onStartGame: (categories: PlayableCategory[], options: GameOptions) => void;
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
  const [selected, setSelected] = useState<PlayableCategory[]>([]);
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
  const { user } = useSupabaseAuth();

  const profileQuery = useQuery({
    queryKey: ["my-profile", user?.id],
    queryFn: getMyProfile,
    enabled: Boolean(user),
    retry: false,
  });

  const canAccessReviewQueue =
    profileQuery.data?.role === "reviewer" || profileQuery.data?.role === "admin";

  const categoriesQuery = useQuery({
    queryKey: ["approved-category-library"],
    queryFn: fetchApprovedCategoryLibrary,
    retry: false,
    staleTime: 60_000,
  });

  const filters = useMemo(() => {
    if (options.includeAfterDark) {
      return [...BASE_FILTERS, { key: "afterDark" as FilterKey, label: "After Dark" }];
    }
    return BASE_FILTERS;
  }, [options.includeAfterDark]);

  const availableCategories = useMemo(() => {
    const categoryLibrary = categoriesQuery.data ?? [];

    if (options.includeAfterDark) {
      return categoryLibrary;
    }

    return categoryLibrary.filter((category) => !category.isAfterDark);
  }, [categoriesQuery.data, options.includeAfterDark]);

  const filtered = useMemo(() => {
    let categories = availableCategories;

    if (search) {
      const query = search.toLowerCase();
      categories = categories.filter((category) => category.name.toLowerCase().includes(query));
    }

    if (filter === "popular") categories = categories.filter((category) => category.isPopular);
    else if (filter === "new") categories = categories.filter((category) => category.isNew);
    else if (filter === "easy") categories = categories.filter((category) => category.difficulty === "easy");
    else if (filter === "medium") categories = categories.filter((category) => category.difficulty === "medium");
    else if (filter === "hard") categories = categories.filter((category) => category.difficulty === "hard");
    else if (filter === "afterDark") categories = categories.filter((category) => category.isAfterDark);

    return categories;
  }, [availableCategories, filter, search]);

  useEffect(() => {
    const latestById = new Map(availableCategories.map((category) => [category.id, category]));

    setSelected((prev) =>
      prev.flatMap((category) => {
        const latestCategory = latestById.get(category.id);
        return latestCategory ? [latestCategory] : [];
      })
    );
  }, [availableCategories]);

  const toggleCategory = (category: PlayableCategory) => {
    setSelected((prev) => {
      const exists = prev.find((entry) => entry.id === category.id);
      if (exists) return prev.filter((entry) => entry.id !== category.id);
      if (prev.length >= 6) return prev;
      return [...prev, category];
    });
  };

  const removeCategory = (id: string) => {
    setSelected((prev) => prev.filter((category) => category.id !== id));
  };

  const randomize = () => {
    const shuffled = [...availableCategories].sort(() => Math.random() - 0.5);
    setSelected(shuffled.slice(0, 6));
  };

  const handleAfterDarkToggle = (value: boolean) => {
    if (value && !ageGateConfirmed) {
      setShowAgeGate(true);
    } else {
      setOptions((prev) => ({ ...prev, includeAfterDark: value }));
      if (!value) {
        setSelected((prev) => prev.filter((category) => !category.isAfterDark));
        if (filter === "afterDark") setFilter("all");
      }
    }
  };

  const handleAgeGateConfirm = () => {
    setAgeGateConfirmed(true);
    setShowAgeGate(false);
    setOptions((prev) => ({ ...prev, includeAfterDark: true }));
  };

  const isSelected = (id: string) => selected.some((category) => category.id === id);
  const isSelectionFull = selected.length === 6;
  const hasCategoryData = availableCategories.length > 0;
  const categoryLoadError =
    categoriesQuery.error instanceof Error
      ? categoriesQuery.error.message
      : "Unable to load live categories right now.";

  useEffect(() => {
    if (!isSelectionFull) return;
    setShowCounterFlash(true);
    const timer = setTimeout(() => setShowCounterFlash(false), 460);
    return () => clearTimeout(timer);
  }, [isSelectionFull]);

  return (
    <div className="glass-page-bg flex min-h-[100dvh] flex-col px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="font-home-title text-5xl font-bold sm:text-7xl">
            <span className="text-white [text-shadow:0_2px_18px_hsl(193_100%_72%/0.45)]">Quiz Duel</span>
          </h1>
          <p className="font-home-subheading mt-2 text-base text-foreground/80">
            Pick 6 categories and start the match.
          </p>
        </motion.div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="glass-panel font-home-ui w-full rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {filters.map((entry) => (
            <button
              key={entry.key}
              onClick={() => setFilter(entry.key)}
              className={`glass-chip font-home-ui rounded-lg px-3 py-1.5 text-xs font-semibold text-white/90 transition-all ${
                filter === entry.key
                  ? entry.key === "afterDark"
                    ? "glass-border-glow bg-game-pink/25"
                    : "glass-border-glow"
                  : ""
              }`}
            >
              {entry.label}
            </button>
          ))}
        </div>

        <div className="mb-3 flex items-center justify-between">
          <motion.span
            className={`glass-chip font-home-subheading rounded-full px-4 py-1.5 text-base font-semibold ${
              isSelectionFull ? "home-counter-full" : ""
            } ${showCounterFlash ? "home-counter-flash" : ""}`}
            animate={isSelectionFull ? { scale: [1, 1.03, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            Selected: <span className="text-primary">{selected.length}</span> / 6
          </motion.span>
          <button
            onClick={randomize}
            disabled={!hasCategoryData || availableCategories.length < 6 || categoriesQuery.isLoading}
            className="glass-action font-home-ui flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Shuffle className="h-3.5 w-3.5" />
            Randomize 6
          </button>
        </div>

        <AnimatePresence>
          {selected.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 flex flex-wrap gap-2 overflow-hidden"
            >
              {selected.map((category) => (
                <motion.span
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`glass-chip flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium ${
                    category.isAfterDark ? "text-game-pink" : "text-primary"
                  }`}
                >
                  {category.name}
                  <button
                    onClick={() => removeCategory(category.id)}
                    className="rounded-full p-0.5 transition-colors hover:bg-white/15"
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
            Select 6 categories to start.
          </p>
        )}

        <div className="mb-6 grid auto-rows-fr grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6">
          {categoriesQuery.isLoading && !hasCategoryData ? (
            <div className="glass-panel col-span-full flex flex-col items-center justify-center rounded-xl py-12 text-center">
              <p className="text-sm text-muted-foreground">Loading approved categories...</p>
            </div>
          ) : categoriesQuery.isError && !hasCategoryData ? (
            <div className="glass-panel col-span-full flex flex-col items-center justify-center rounded-xl py-12 text-center">
              <p className="mb-3 max-w-md text-sm text-muted-foreground">{categoryLoadError}</p>
              <button
                onClick={() => categoriesQuery.refetch()}
                className="glass-action rounded-lg px-4 py-2 text-sm font-semibold text-white/80"
              >
                Retry
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <Search className="mb-2 h-8 w-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                {hasCategoryData ? "No categories found" : "No approved categories are live yet"}
              </p>
            </div>
          ) : (
            filtered.map((category, index) => {
              const selectedCategory = isSelected(category.id);
              const selectionLocked = selected.length >= 6 && !selectedCategory;

              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  disabled={selectionLocked}
                  onClick={() => toggleCategory(category)}
                  className={`glass-panel group relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-xl text-left transition-all ${
                    selectedCategory
                      ? category.isAfterDark
                        ? "border-game-pink/65 shadow-[0_0_18px_hsl(var(--game-pink)/0.35)]"
                        : "glass-border-glow"
                      : selectionLocked
                        ? "cursor-not-allowed opacity-45"
                        : ""
                  }`}
                >
                  <div className="h-28 w-full overflow-hidden sm:h-32">
                    <img
                      src={category.categoryImage}
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      onError={(event) => {
                        (event.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2 p-4">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        selectedCategory
                          ? category.isAfterDark
                            ? "bg-game-pink/20 text-game-pink"
                            : "bg-primary/20 text-primary"
                          : "bg-white/10 text-white/85"
                      }`}
                    >
                      <CategoryIcon iconName={category.icon} className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-home-ui block truncate text-base font-bold text-foreground">
                        {category.name}
                      </span>
                      <span className="flex items-center gap-1.5 text-[10px] text-white/75">
                        <span className={difficultyColors[category.difficulty]}>
                          {category.difficulty}
                        </span>
                        {category.isNew && (
                          <span className="rounded bg-game-purple/25 px-1.5 py-1 text-[10px] font-bold text-white">New</span>
                        )}
                        {category.isPopular && (
                          <span className="rounded bg-white/15 px-1.5 py-1 text-[10px] font-bold text-white">Hot</span>
                        )}
                        {category.isAfterDark && (
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

        <Collapsible open={optionsOpen} onOpenChange={setOptionsOpen} className="mb-6">
          <CollapsibleTrigger className="glass-panel font-home-subheading flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-white/80 transition-colors hover:text-white">
            <span>Game Options</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${optionsOpen ? "rotate-180" : ""}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="glass-panel mt-2 space-y-4 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="font-home-subheading text-sm text-white/70">Points</span>
              <span className="font-home-ui text-sm font-semibold text-white">200 / 400 / 600</span>
            </div>
            <OptionRow
              label="Allow score edits (+/-)"
              checked={options.allowScoreEdits}
              onChange={(value) => setOptions((prev) => ({ ...prev, allowScoreEdits: value }))}
            />
            <OptionRow
              label="Incorrect answer penalty"
              checked={options.incorrectPenalty}
              onChange={(value) => setOptions((prev) => ({ ...prev, incorrectPenalty: value }))}
            />
            <OptionRow
              label="Sound effects"
              checked={options.soundEffects}
              onChange={(value) => setOptions((prev) => ({ ...prev, soundEffects: value }))}
            />
            <OptionRow
              label="Haptics"
              checked={options.haptics}
              onChange={(value) => setOptions((prev) => ({ ...prev, haptics: value }))}
            />
            <OptionRow
              label="Keep turn on correct answer"
              checked={options.keepTurnOnCorrect}
              onChange={(value) => setOptions((prev) => ({ ...prev, keepTurnOnCorrect: value }))}
            />
            <OptionRow
              label="Include After Dark (18+)"
              checked={options.includeAfterDark}
              onChange={handleAfterDarkToggle}
            />
          </CollapsibleContent>
        </Collapsible>

        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={selected.length !== 6 || categoriesQuery.isLoading || categoriesQuery.isError}
          onClick={() => onStartGame(selected, options)}
          className={`font-home-ui flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-bold transition-all ${
            selected.length === 6 && !categoriesQuery.isLoading && !categoriesQuery.isError
              ? "glass-action-primary"
              : "cursor-not-allowed glass-action text-white/55"
          }`}
        >
          <Play className="h-4 w-4" />
          Start Game
        </motion.button>

        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            to="/contribute"
            className="glass-action rounded-xl px-4 py-2 text-sm font-semibold text-white/80"
          >
            Submit questions
          </Link>
          {canAccessReviewQueue && (
            <Link
              to="/review"
              className="glass-action rounded-xl px-4 py-2 text-sm font-semibold text-white/80"
            >
              Review queue
            </Link>
          )}
        </div>
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
  onChange: (value: boolean) => void;
}) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-white/75">{label}</span>
    <Switch checked={checked} onCheckedChange={onChange} />
  </div>
);


