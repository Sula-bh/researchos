import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateProject } from "@/api/projectApi";
import { getErrorMessage } from "@/lib/error";
import { projectSchema, type ProjectFormValues } from "@/schemas/projectSchema";
import type { Project } from "@/types/project";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type EditProjectDialogProps = {
  project: Project | null;

  onClose: () => void;

  onUpdated: () => Promise<void>;
};

export default function EditProjectDialog({
  project,
  onClose,
  onUpdated,
}: EditProjectDialogProps) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),

    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!project) return;

    form.reset({
      title: project.title,
      description: project.description ?? "",
    });
  }, [project, form]);

  async function onSubmit(values: ProjectFormValues) {
    if (!project) return;

    try {
      await updateProject(project.id, values);

      toast.success("Project updated successfully.");

      onClose();

      await onUpdated();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <Dialog
      open={project !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>

          <DialogDescription>
            Update your project information.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>

                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
