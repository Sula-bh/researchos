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
  onDelete: (id: string) => void;
};

export default function PaperCard({ paper, onDelete }: PaperCardProps) {
  const navigate = useNavigate();
  const { projectId } = useParams();

  function handleOpenDetails() {
    navigate(`/projects/${projectId}/papers/${paper.id}`);
  }

  return (
    <Card
      className="cursor-pointer transition-all hover:shadow-md"
      onClick={handleOpenDetails}
    >
      <CardContent className="flex items-start justify-between p-5">
        <div className="flex gap-4">
          <div className="rounded-lg bg-primary/10 p-3">
            <FileText className="h-6 w-6 text-primary" />
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold">{paper.title}</h3>

            <p className="text-sm text-muted-foreground">
              {paper.authors ?? "Unknown author"}
            </p>

            <p className="text-xs text-muted-foreground">
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
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem onClick={() => openPaper(paper.id)}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Open PDF
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onDelete(paper.id)}
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
