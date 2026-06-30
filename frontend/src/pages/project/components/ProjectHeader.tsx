import type { Project } from "@/types/project";

type ProjectHeaderProps = {
  project?: Project;
};

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return <h2>{project?.title}</h2>;
}
