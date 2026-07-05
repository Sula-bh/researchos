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

  onUpdated: (project: Project) => void;
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
      const updatedProject = await updateProject(project.id, values);

      toast.success("Project updated successfully.");

      onUpdated(updatedProject);

      onClose();
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
      <DialogContent className="rounded-[18px] border-[#dcd7ff] bg-white p-7 shadow-[0_24px_80px_rgba(72,56,178,0.18)]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#111832]">
            Edit Project
          </DialogTitle>

          <DialogDescription className="text-[#65708c]">
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
                    <Input
                      className="h-11 rounded-xl border-[#e1dcff] bg-[#fbfaff] focus-visible:border-[#7459ff] focus-visible:ring-[#7459ff]/20"
                      {...field}
                    />
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
                    <Textarea
                      rows={5}
                      className="min-h-32 rounded-xl border-[#e1dcff] bg-[#fbfaff] focus-visible:border-[#7459ff] focus-visible:ring-[#7459ff]/20"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-xl border-[#dcd7ff] text-[#4b5875] hover:bg-[#f8f6ff]"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="h-10 rounded-xl bg-[#5b3df2] px-4 text-white hover:bg-[#4f35f2]"
              >
                {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
