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
    <div className="mx-auto max-w-6xl space-y-5">
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#111832]">
            Notes
          </h1>

          <p className="mt-2 text-sm text-[#65708c]">
            Capture ideas, summaries and research insights.
          </p>
        </div>

        <Button
          asChild
          className="h-11 rounded-xl bg-[#5b3df2] px-4 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(91,61,242,0.22)] hover:bg-[#4f35f2]"
        >
          <Link to="new">
            <Plus className="mr-2 h-4 w-4" />
            New Note
          </Link>
        </Button>
      </div>

      {/* Search */}

      <div className="rounded-2xl border border-[#e1dcff] bg-white p-4 shadow-[0_18px_50px_rgba(72,56,178,0.06)]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#65708c]" />

          <Input
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 rounded-xl border-[#e1dcff] bg-[#fbfaff] pl-10 text-sm shadow-none placeholder:text-[#98a0b7] focus-visible:border-[#7459ff] focus-visible:ring-[#7459ff]/20"
          />
        </div>
      </div>

      {/* Content */}

      {filteredNotes.length === 0 ? (
        notes.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-[#cfc8ff] bg-white py-20 shadow-[0_18px_50px_rgba(72,56,178,0.05)]">
            <div className="rounded-[18px] bg-[#fff7e8] p-4">
              <FileText className="h-10 w-10 text-[#f59e0b]" />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-[#111832]">
              No notes yet
            </h2>

            <p className="mt-2 max-w-md text-center text-[#65708c]">
              Start documenting ideas, summaries and research findings.
            </p>

            <div className="mt-8">
              <Button
                asChild
                className="h-11 rounded-xl bg-[#5b3df2] px-4 text-sm font-semibold text-white hover:bg-[#4f35f2]"
              >
                <Link to="new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Note
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-[#cfc8ff] bg-white py-20 shadow-[0_18px_50px_rgba(72,56,178,0.05)]">
            <Search className="h-10 w-10 text-[#65708c]" />

            <h2 className="mt-6 text-xl font-semibold text-[#111832]">
              No matching notes
            </h2>

            <p className="mt-2 text-[#65708c]">Try another search term.</p>
          </div>
        )
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
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
