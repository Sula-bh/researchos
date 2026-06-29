import { useEffect, useState } from "react";

import { getProjects } from "@/api/projectApi";
import type { Project } from "@/types/project";
import ProjectCard from "@/pages/projects/components/ProjectCard";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Projects</h1>

      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
