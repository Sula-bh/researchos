import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

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
    <main className="flex h-screen overflow-hidden bg-[#fbfaff] text-[#111832]">
      <ProjectSidebar project={project} />

      <main className="min-w-0 flex-1 overflow-y-auto p-5 sm:p-6 lg:p-7">
        <Outlet />
      </main>
    </main>
  );
}
