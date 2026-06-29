import type { Project } from "@/types/project";
import { Link } from "react-router-dom";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/projects/${project.id}`}>
      <h2>{project.title}</h2>

      <p>{project.description}</p>
    </Link>
  );
}
