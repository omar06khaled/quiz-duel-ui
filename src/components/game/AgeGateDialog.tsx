import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface AgeGateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const AgeGateDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: AgeGateDialogProps) => {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="glass-panel-strong border-border/50 bg-card/40">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display">After Dark (18+)</AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <span className="block">
              Adult humor / suggestive party content. You must be 18+.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center gap-3 px-1 py-2">
          <Checkbox
            id="age-confirm"
            checked={confirmed}
            onCheckedChange={(v) => setConfirmed(v === true)}
          />
          <label htmlFor="age-confirm" className="text-sm text-foreground cursor-pointer">
            I confirm I am 18+
          </label>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="glass-action border-border/50 bg-secondary/40 text-foreground hover:bg-muted/40"
            onClick={() => setConfirmed(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={!confirmed}
            onClick={() => {
              onConfirm();
              setConfirmed(false);
            }}
            className="glass-action-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
