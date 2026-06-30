import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { createNote } from "@/api/noteApi";
import { getErrorMessage } from "@/lib/error";

import { noteSchema, type NoteFormValues } from "@/schemas/noteSchema";

import type { Note } from "@/types/note";

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
import MarkdownEditor from "./MarkdownEditor";

import { Plus } from "lucide-react";
import { useState } from "react";

type CreateNoteDialogProps = {
  onCreated: (note: Note) => void;
};

export default function CreateNoteDialog({ onCreated }: CreateNoteDialogProps) {
  const { projectId } = useParams();

  const [open, setOpen] = useState(false);

  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),

    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(values: NoteFormValues) {
    if (!projectId) return;

    try {
      const note = await createNote(projectId, values);

      onCreated(note);

      toast.success("Note created successfully.");

      form.reset();

      setOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Create Note</DialogTitle>

          <DialogDescription>
            Capture an idea, summary or research insight.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>

                  <FormControl>
                    <Input placeholder="Literature Review" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>

                  <FormControl>
                    <MarkdownEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Write your research note..."
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
                {form.formState.isSubmitting ? "Creating..." : "Create Note"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
