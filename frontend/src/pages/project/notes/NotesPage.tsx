import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FileText, Plus, Search } from "lucide-react";
import { toast } from "sonner";

import { deleteNote, getNotes } from "@/api/noteApi";
import { getErrorMessage } from "@/lib/error";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { Note } from "@/types/note";

import NoteCard from "./components/NoteCard";
import DeleteNoteDialog from "./components/DeleteNoteDialog";

export default function NotesPage() {
  const { projectId } = useParams();

  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");

  const [deletingNote, setDeletingNote] = useState<Note | null>(null);

  async function loadNotes(id: string) {
    try {
      const data = await getNotes(id);

      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!projectId) return;

    loadNotes(projectId);
  }, [projectId]);

  const filteredNotes = useMemo(() => {
    const query = search.toLowerCase();

    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query),
    );
  }, [notes, search]);

  async function handleDelete() {
    if (!deletingNote) return;

    try {
      await deleteNote(deletingNote.id);

      setNotes((previous) =>
        previous.filter((note) => note.id !== deletingNote.id),
      );

      toast.success("Note deleted.");

      setDeletingNote(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notes</h1>

          <p className="mt-2 text-muted-foreground">
            Capture ideas, summaries and research insights.
          </p>
        </div>

        <Button asChild>
          <Link to="new">
            <Plus className="mr-2 h-4 w-4" />
            New Note
          </Link>
        </Button>
      </div>

      {/* Search */}

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Content */}

      {filteredNotes.length === 0 ? (
        notes.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed py-20">
            <div className="rounded-full bg-primary/10 p-4">
              <FileText className="h-10 w-10 text-primary" />
            </div>

            <h2 className="mt-6 text-xl font-semibold">No notes yet</h2>

            <p className="mt-2 max-w-md text-center text-muted-foreground">
              Start documenting ideas, summaries and research findings.
            </p>

            <div className="mt-8">
              <Button asChild>
                <Link to="new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Note
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-xl border border-dashed py-20">
            <Search className="h-10 w-10 text-muted-foreground" />

            <h2 className="mt-6 text-xl font-semibold">No matching notes</h2>

            <p className="mt-2 text-muted-foreground">
              Try another search term.
            </p>
          </div>
        )
      ) : (
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={setDeletingNote} />
          ))}
        </div>
      )}

      <DeleteNoteDialog
        note={deletingNote}
        onClose={() => setDeletingNote(null)}
        onDelete={handleDelete}
      />
    </div>
  );
}
