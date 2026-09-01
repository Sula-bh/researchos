import type { Paper } from "@/types/paper";

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

import { Button } from "@/components/ui/button";

type DeletePaperDialogProps = {
  paper: Paper | null;
  onClose: () => void;
  onDelete: () => void;
};

export default function DeletePaperDialog({
  paper,
  onClose,
  onDelete,
}: DeletePaperDialogProps) {
  return (
    <AlertDialog
      open={paper !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <AlertDialogContent className="rounded-[18px] border border-[#ffd7d7] bg-white p-6 shadow-[0_24px_80px_rgba(72,56,178,0.16)]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold text-[#111832]">
            Delete "{paper?.title}"?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-[#65708c]">
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="border-[#eeeaff] bg-[#fbfaff]">
          <AlertDialogCancel className="rounded-xl border-[#dcd7ff]">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              className="rounded-xl"
              onClick={onDelete}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
