import { useState } from "react";
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createProject } from "@/api/projectApi";
import { getErrorMessage } from "@/lib/error";
import { projectSchema, type ProjectFormValues } from "@/schemas/projectSchema";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import type { Project } from "@/types/project";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type CreateProjectDialogProps = {
  onCreated: (project: Project) => void;
};

export default function CreateProjectDialog({
  onCreated,
}: CreateProjectDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),

    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: ProjectFormValues) {
    try {
      const project = await createProject(values);

      toast.success("Project created successfully.");

      form.reset();

      setOpen(false);

      onCreated(project);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-11 rounded-[12px] bg-[#5b3df2] px-4 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(91,61,242,0.22)] hover:bg-[#4f35f2]">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-[18px] border-[#dcd7ff] bg-white p-7 shadow-[0_24px_80px_rgba(72,56,178,0.18)] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#111832]">
            Create Project
          </DialogTitle>

          <DialogDescription className="text-[#65708c]">
            Create a new research project to organize papers, notes and
            experiments.
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
                      placeholder="Cyberbullying Detection"
                      className="h-11 rounded-[12px] border-[#e1dcff] bg-[#fbfaff] focus-visible:border-[#7459ff] focus-visible:ring-[#7459ff]/20"
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
                      placeholder="Describe your research project..."
                      className="min-h-32 rounded-[12px] border-[#e1dcff] bg-[#fbfaff] focus-visible:border-[#7459ff] focus-visible:ring-[#7459ff]/20"
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
                className="h-10 rounded-[12px] border-[#dcd7ff] text-[#4b5875] hover:bg-[#f8f6ff]"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="h-10 rounded-[12px] bg-[#5b3df2] px-4 text-white hover:bg-[#4f35f2]"
              >
                {form.formState.isSubmitting ? "Creating..." : "Create Project"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
