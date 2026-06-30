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

  onDeleted: () => Promise<void>;
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

      onClose();

      await onDeleted();
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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Project?</AlertDialogTitle>

          <AlertDialogDescription>
            This will permanently delete <strong>{project?.title}</strong> and
            all of its papers, notes, experiments, chats and knowledge graph.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Project
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
