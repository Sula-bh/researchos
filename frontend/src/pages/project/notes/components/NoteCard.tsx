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
      className="cursor-pointer rounded-[14px] border-[#eadbbd] bg-[#fffbf3] py-0 shadow-[0_12px_30px_rgba(130,82,0,0.05)] transition-all hover:-translate-y-0.5 hover:border-[#f2c66d] hover:shadow-[0_18px_42px_rgba(130,82,0,0.1)]"
      onClick={() => navigate(`/projects/${projectId}/notes/${note.id}`)}
    >
      {/* Clickable Area */}
      <CardContent className="relative z-10 flex items-start justify-between gap-4 p-5">
        <div className="flex min-w-0 flex-1 gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-white text-[#f59e0b] shadow-sm">
            <FileText className="h-6 w-6" />
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            <h3 className="truncate font-semibold text-[#111832]">
              {note.title}
            </h3>

            <p className="line-clamp-3 text-sm leading-6 text-[#5f5a4f]">
              {note.content}
            </p>

            <p className="text-xs text-[#9a8462]">
              Updated {formatDateTime(note.updated_at)}
            </p>
          </div>
        </div>

        {/* Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="relative z-20 h-9 w-9 rounded-[10px] text-[#9a8462] hover:bg-white hover:text-[#4f35f2]"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            onClick={(e) => e.stopPropagation()}
            className="rounded-[18px] border border-[#ffd7d7] bg-white shadow-[0_24px_80px_rgba(72,56,178,0.16)]"
          >
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
