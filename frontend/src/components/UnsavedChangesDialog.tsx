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

type UnsavedChangesDialogProps = {
  open: boolean;
  onCancel: () => void;
  onDiscard: () => void;
  onSave: () => void;
};

export default function UnsavedChangesDialog({
  open,
  onCancel,
  onDiscard,
  onSave,
}: UnsavedChangesDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="rounded-[18px] border-[#dcd7ff] bg-white p-7 shadow-[0_24px_80px_rgba(72,56,178,0.18)] sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-[#111832]">
            You have unsaved changes
          </AlertDialogTitle>

          <AlertDialogDescription className="text-[#65708c]">
            Save your changes before leaving this page?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={onDiscard}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Discard
          </AlertDialogAction>

          <AlertDialogAction onClick={onSave}>Save & Leave</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
