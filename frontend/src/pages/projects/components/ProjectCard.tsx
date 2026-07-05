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

const coverStyles = [
  "from-[#2110a8] via-[#5435f2] to-[#00b8d9]",
  "from-[#047857] via-[#0f766e] to-[#20d3a2]",
  "from-[#381092] via-[#6d28d9] to-[#b075ff]",
  "from-[#0f3b84] via-[#2563eb] to-[#60a5fa]",
];

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const coverStyle =
    coverStyles[project.title.length % coverStyles.length] ?? coverStyles[0];

  return (
    <Card className="group overflow-hidden rounded-[14px] border-[#e1dcff] bg-white py-0 shadow-[0_12px_30px_rgba(72,56,178,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c7bcff] hover:shadow-[0_18px_42px_rgba(72,56,178,0.12)]">
      <Link to={`/projects/${project.id}`} className="block">
        <div
          className={`relative h-28 overflow-hidden bg-linear-to-br ${coverStyle}`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(255,255,255,0.34),transparent_1.5rem),radial-gradient(circle_at_70%_25%,rgba(255,255,255,0.22),transparent_2rem),linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.18)_48%,transparent_49%)]" />
          <BrainLines />
        </div>
      </Link>

      <CardHeader className="flex flex-row items-start justify-between gap-3 px-4 pt-4 pb-0">
        <Link to={`/projects/${project.id}`} className="min-w-0 flex-1">
          <CardTitle className="truncate text-base font-bold text-[#111832]">
            {project.title}
          </CardTitle>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-[10px] text-[#65708c] hover:bg-[#f1efff] hover:text-[#4f35f2]"
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
        <CardContent className="space-y-4 px-4 pt-2 pb-4">
          <p className="line-clamp-2 min-h-10 text-sm leading-5 text-[#65708c]">
            {project.description || "No description provided."}
          </p>

          <div className="flex items-center gap-2 text-xs text-[#65708c]">
            <Calendar className="h-4 w-4 text-[#5b3df2]" />

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

function BrainLines() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-70"
      viewBox="0 0 320 112"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M28 82C70 24 105 98 146 50C183 7 209 83 251 35C272 12 293 21 310 8"
        stroke="white"
        strokeWidth="1.2"
        opacity="0.75"
      />
      <path
        d="M18 48C52 28 73 42 100 62C135 88 155 34 188 58C216 78 244 74 278 38"
        stroke="white"
        strokeWidth="1"
        opacity="0.45"
      />
      <circle cx="64" cy="31" r="3" fill="white" opacity="0.65" />
      <circle cx="126" cy="72" r="3" fill="white" opacity="0.65" />
      <circle cx="210" cy="52" r="3" fill="white" opacity="0.65" />
      <circle cx="274" cy="36" r="3" fill="white" opacity="0.65" />
    </svg>
  );
}
