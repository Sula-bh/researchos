import { FileText, MoreVertical, Trash2, ExternalLink } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import type { Paper } from "@/types/paper";

type PaperCardProps = {
  paper: Paper;
};

export default function PaperCard({ paper }: PaperCardProps) {
  return (
    <Card className="transition-all hover:shadow-md">
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
              Uploaded {new Date(paper.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <ExternalLink className="mr-2 h-4 w-4" />
              Open PDF
            </DropdownMenuItem>

            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
