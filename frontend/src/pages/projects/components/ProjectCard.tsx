import type { Project } from "@/types/project";
import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/projects/${project.id}`}>
      <Card className="mb-4 transition hover:shadow-lg">
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p>{project.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
