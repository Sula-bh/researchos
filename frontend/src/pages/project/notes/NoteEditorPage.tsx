import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { createNote, getNote, updateNote } from "@/api/noteApi";

import type { Note } from "@/types/note";

import { getErrorMessage } from "@/lib/error";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import UnsavedChangesDialog from "@/components/UnsavedChangesDialog";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { useHotkey } from "@/hooks/useHotkey";

import NoteEditor from "./components/NoteEditor";

export default function NoteEditorPage() {
  const { projectId, noteId } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState<Note | null>(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [savedTitle, setSavedTitle] = useState("");
  const [savedContent, setSavedContent] = useState("");

  const isDirty = title !== savedTitle || content !== savedContent;

  const { open, cancel, discard, allowNextNavigation } =
    useUnsavedChanges(isDirty);

  useEffect(() => {
    if (!noteId) return;

    const id = noteId;

    async function loadNote() {
      try {
        setLoading(true);

        const data = await getNote(id);

        setNote(data);

        setTitle(data.title);
        setContent(data.content);

        setSavedTitle(data.title);
        setSavedContent(data.content);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    }

    loadNote();
  }, [noteId]);

  useHotkey("mod+s", () => {
    if (isDirty && !saving) {
      void handleSave();
    }
  });

  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (!isDirty) return;

      e.preventDefault();
      e.returnValue = "";
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  async function handleSave(): Promise<boolean> {
    if (saving) return false;

    if (!projectId) return false;

    if (!title.trim()) {
      toast.error("Please enter a title.");
      return false;
    }

    try {
      setSaving(true);

      if (noteId) {
        const updated = await updateNote(noteId, {
          title,
          content,
        });

        setNote(updated);

        setTitle(updated.title);
        setContent(updated.content);

        setSavedTitle(updated.title);
        setSavedContent(updated.content);

        toast.success("Note updated.");

        return true;
      }

      const created = await createNote(projectId, {
        title,
        content,
      });

      toast.success("Note created.");

      allowNextNavigation();

      navigate(`/projects/${projectId}/notes/${created.id}`, {
        replace: true,
      });

      return true;
    } catch (error) {
      toast.error(getErrorMessage(error));
      return false;
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6">
        <Skeleton className="h-8 w-40 bg-[#eeeaff]" />
        <Skeleton className="h-12 w-80 bg-[#eeeaff]" />
        <Skeleton className="h-150 w-full rounded-[18px] bg-[#eeeaff]" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Button
        variant="ghost"
        asChild
        className="rounded-[12px] text-[#65708c] hover:bg-[#f1efff] hover:text-[#4f35f2]"
      >
        <Link to={`/projects/${projectId}/notes`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Notes
        </Link>
      </Button>

      <NoteEditor
        title={title}
        content={content}
        loading={saving}
        dirty={isDirty}
        updatedAt={note?.updated_at}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onSave={handleSave}
      />

      <UnsavedChangesDialog
        open={open}
        onCancel={cancel}
        onDiscard={discard}
        onSave={async () => {
          const success = await handleSave();

          if (success) {
            allowNextNavigation();
            discard();
          }
        }}
      />
    </div>
  );
}
