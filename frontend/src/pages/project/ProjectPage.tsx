import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProject } from "@/api/projectApi";
import ProjectSidebar from "./components/ProjectSidebar";
import type { Project } from "@/types/project";

export default function ProjectPage() {
  const { projectId } = useParams();

  const [project, setProject] = useState<Project>();

  useEffect(() => {
    if (!projectId) return;
    const id = projectId;

    async function fetchProject() {
      try {
        const data = await getProject(id);
        setProject(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProject();
  }, [projectId]);

  return (
    <main className="flex h-screen">
      <ProjectSidebar />

      <section className="flex-1 p-8">
        <h1>{project?.title}</h1>
      </section>
    </main>
  );
}
