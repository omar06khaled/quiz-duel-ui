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
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
      className={`group relative flex h-[5.5rem] items-center justify-center rounded-2xl font-display font-extrabold transition-all sm:h-[6.5rem] ${
        disabled
          ? "tileDisabled bg-game-tile-disabled"
          : "tileInteractive bg-game-tile text-game-gold hover:bg-game-tile-hover"
      }`}
    >
      {!disabled && (
        <span className="absolute inset-0 rounded-2xl border border-game-gold/8 transition-colors group-hover:border-game-gold/20" />
      )}
      {disabled ? (
        <div className="flex flex-col items-center gap-1">
          <Lock className="h-3.5 w-3.5 text-muted-foreground/25" />
          <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground/25 font-display">
            Used
          </span>
        </div>
      ) : (
        <span className="point-value-arcade">{points}</span>
      )}
    </motion.button>
  );
};
