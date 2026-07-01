import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import NoteEditor from "./components/NoteEditor";

import { createNote, getNote, updateNote } from "@/api/noteApi";
import type { Note } from "@/types/note";

export default function NoteEditorPage() {
  const { projectId, noteId } = useParams();

  const navigate = useNavigate();

  const [note, setNote] = useState<Note | null>(null);

  const [loading, setLoading] = useState(false);

  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadNote();
  }, [noteId]);

  async function handleSave() {
    if (!projectId) return;

    if (!title.trim()) {
      toast.error("Please enter a title.");

      return;
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

        toast.success("Note updated.");
      } else {
        const created = await createNote(projectId, {
          title,
          content,
        });

        toast.success("Note created.");

        navigate(`/projects/${projectId}/notes/${created.id}`, {
          replace: true,
        });
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <Button variant="ghost" asChild>
        <Link to={`/projects/${projectId}/notes`}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Notes
        </Link>
      </Button>

      <NoteEditor
        title={title}
        content={content}
        loading={saving}
        updatedAt={note?.updated_at}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onSave={handleSave}
      />
    </div>
  );
}
