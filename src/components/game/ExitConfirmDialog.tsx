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

interface ExitConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const ExitConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: ExitConfirmDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="glass-panel-strong border-border/50 bg-card/40">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display">Exit game?</AlertDialogTitle>
          <AlertDialogDescription>
            Your current game progress will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="glass-action border-border/50 bg-secondary/40 text-foreground hover:bg-muted/40">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="glass-action border-destructive/45 bg-destructive/70 text-destructive-foreground hover:bg-destructive/80"
          >
            Exit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
