import { useState } from "react";
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createProject, type CreateProjectRequest } from "@/api/projectApi";
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

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type CreateProjectDialogProps = {
  onCreated: () => Promise<void>;
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
      await createProject(values as CreateProjectRequest);

      toast.success("Project created successfully.");

      form.reset();

      setOpen(false);

      await onCreated();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>

          <DialogDescription>
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
                    <Input placeholder="Cyberbullying Detection" {...field} />
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
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Creating..." : "Create Project"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
