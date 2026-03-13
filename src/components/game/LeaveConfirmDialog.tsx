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

interface LeaveConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const LeaveConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: LeaveConfirmDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="glass-panel-strong border-border/50 bg-card/40">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display">Leave without scoring?</AlertDialogTitle>
          <AlertDialogDescription>
            This question won't be marked as answered. You can return to it later.
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
            Leave
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
