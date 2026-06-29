import { useEffect, useState } from "react";

import { getProjects } from "@/api/projectApi";
import ProjectCard from "./components/ProjectCard";
import type { Project } from "@/types/project";

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
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="text-3xl font-bold">Projects</h1>

      <div className="mt-8">
        {projects.length === 0 ? (
          <p>No projects yet.</p>
        ) : (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>
    </main>
  );
}
