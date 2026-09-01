import { ExternalLink, FileText, MoreVertical, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { openPaper } from "@/api/paperApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Paper } from "@/types/paper";

type PaperCardProps = {
  paper: Paper;
  onDelete: (paper: Paper) => void;
};

export default function PaperCard({ paper, onDelete }: PaperCardProps) {
  const navigate = useNavigate();
  const { projectId } = useParams();

  function handleOpenDetails() {
    navigate(`/projects/${projectId}/papers/${paper.id}`);
  }

  return (
    <Card
      className="cursor-pointer rounded-[14px] border-[#e1dcff] bg-white py-0 shadow-none transition-all hover:border-[#c7bcff] hover:bg-[#fbfaff] hover:shadow-[0_12px_30px_rgba(72,56,178,0.08)]"
      onClick={handleOpenDetails}
    >
      <CardContent className="flex items-start justify-between gap-4 p-4">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#fff0f0] text-[#ef4444]">
            <FileText className="h-6 w-6" />
          </div>

          <div className="min-w-0 space-y-1">
            <h3 className="truncate font-semibold text-[#111832]">
              {paper.title}
            </h3>

            <p className="truncate text-sm text-[#65708c]">
              {paper.authors ?? "Unknown author"}
            </p>

            <p className="text-xs text-[#98a0b7]">
              Uploaded{" "}
              {new Date(paper.created_at).toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-[10px] text-[#65708c] hover:bg-[#f1efff] hover:text-[#4f35f2]"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            onClick={(e) => e.stopPropagation()}
            className="rounded-[18px] border border-[#ffd7d7] bg-white shadow-[0_24px_80px_rgba(72,56,178,0.16)]"
          >
            <DropdownMenuItem onClick={() => openPaper(paper.id)}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Open PDF
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onDelete(paper)}
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
