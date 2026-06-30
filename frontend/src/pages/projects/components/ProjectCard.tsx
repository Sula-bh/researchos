import { Calendar, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import type { Project } from "@/types/project";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ProjectCardProps = {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
};

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  return (
    <Card className="group transition-all duration-200 hover:border-primary/20 hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <Link to={`/projects/${project.id}`} className="flex-1 min-w-0">
          <CardTitle className="truncate text-lg">{project.title}</CardTitle>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuItem onClick={() => onEdit(project)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(project)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <Link to={`/projects/${project.id}`} className="block flex-1">
        <CardContent className="space-y-6">
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {project.description || "No description provided."}
          </p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-4 w-4" />

            <span>
              Updated{" "}
              {new Date(project.updated_at).toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
