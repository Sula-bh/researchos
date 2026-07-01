import { FileText, MoreVertical, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import type { Note } from "@/types/note";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { formatDateTime } from "@/lib/date";

type NoteCardProps = {
  note: Note;
  onDelete: (note: Note) => void;
};

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  const navigate = useNavigate();
  const { projectId } = useParams();

  return (
    <Card
      className="cursor-pointer transition-all hover:border-primary/20 hover:shadow-md"
      onClick={() => navigate(`/projects/${projectId}/notes/${note.id}`)}
    >
      {/* Clickable Area */}
      <CardContent className="relative z-10 flex items-start justify-between p-5">
        <div className="flex min-w-0 flex-1 gap-4">
          <div className="rounded-lg bg-primary/10 p-3">
            <FileText className="h-6 w-6 text-primary" />
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            <h3 className="truncate font-semibold">{note.title}</h3>

            <p className="line-clamp-3 text-sm text-muted-foreground">
              {note.content}
            </p>

            <p className="text-xs text-muted-foreground">
              Updated {formatDateTime(note.updated_at)}
            </p>
          </div>
        </div>

        {/* Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="relative z-20">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem
              onClick={() => onDelete(note)}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
