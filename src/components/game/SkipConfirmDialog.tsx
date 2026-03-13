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

interface SkipConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const SkipConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: SkipConfirmDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="glass-panel-strong border-border/50 bg-card/40">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display">Skip this question?</AlertDialogTitle>
          <AlertDialogDescription>
            The tile will remain unused and can be selected again later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="glass-action border-border/50 bg-secondary/40 text-foreground hover:bg-muted/40">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="glass-action-primary"
          >
            Skip
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
