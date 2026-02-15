import { motion } from "framer-motion";
import { Lock } from "lucide-react";

interface PointTileProps {
  points: number;
  disabled: boolean;
  onClick: () => void;
  delay?: number;
}

export const PointTile = ({ points, disabled, onClick, delay = 0 }: PointTileProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
      className={`group relative flex h-[5.5rem] items-center justify-center rounded-xl font-display font-bold transition-all duration-200 sm:h-[6.5rem] ${
        disabled
          ? "tileDisabled bg-game-tile-disabled text-muted-foreground/20"
          : "tileInteractive game-tile-glow bg-game-tile text-game-gold hover:bg-game-tile-hover"
      }`}
    >
      {!disabled && (
        <span className="absolute inset-0 rounded-xl border border-game-gold/10 transition-colors group-hover:border-game-gold/25" />
      )}
      {disabled ? (
        <div className="flex flex-col items-center gap-0.5">
          <Lock className="h-3.5 w-3.5 text-muted-foreground/30" />
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground/30 font-display">Used</span>
        </div>
      ) : (
        <span className="point-value-arcade">{points}</span>
      )}
    </motion.button>
  );
};
