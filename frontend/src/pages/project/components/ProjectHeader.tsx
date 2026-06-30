import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import type { Project } from "@/types/project";

type ProjectHeaderProps = {
  project?: Project;
};

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <header className="border-b bg-background">
      <div className="px-8 py-6">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Projects
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {project?.title ?? "Loading..."}
          </h1>

          {project?.description && (
            <p className="max-w-3xl text-muted-foreground">
              {project.description}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
