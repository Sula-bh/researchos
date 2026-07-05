import { toast } from "sonner";

import { deleteProject } from "@/api/projectApi";
import { getErrorMessage } from "@/lib/error";
import type { Project } from "@/types/project";

import { Button } from "@/components/ui/button";

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

type DeleteProjectDialogProps = {
  project: Project | null;

  onClose: () => void;

  onDeleted: (projectId: string) => void;
};

export default function DeleteProjectDialog({
  project,
  onClose,
  onDeleted,
}: DeleteProjectDialogProps) {
  async function handleDelete() {
    if (!project) return;

    try {
      await deleteProject(project.id);

      toast.success("Project deleted successfully.");

      onDeleted(project.id);

      onClose();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <AlertDialog
      open={project !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <AlertDialogContent className="rounded-[18px] border border-[#ffd7d7] bg-white p-6 shadow-[0_24px_80px_rgba(72,56,178,0.16)]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold text-[#111832]">
            Delete Project?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-[#65708c]">
            This will permanently delete <strong>{project?.title}</strong> and
            all of its papers, notes, experiments, chats and knowledge graph.
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
              onClick={handleDelete}
            >
              Delete Project
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
