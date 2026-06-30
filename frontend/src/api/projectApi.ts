import api from "@/lib/api";
import type { Project } from "@/types/project";

export async function getProjects(): Promise<Project[]> {
  const response = await api.get("/projects");

  return response.data.data as Project[];
}

export async function getProject(projectId: string): Promise<Project> {
  const response = await api.get(`/projects/${projectId}`);

  return response.data.data as Project;
}
