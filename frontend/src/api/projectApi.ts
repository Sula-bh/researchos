import api from "@/lib/api";
import type { Project } from "@/types/project";

export type CreateProjectRequest = {
  title: string;
  description?: string;
};

export async function getProjects(): Promise<Project[]> {
  const response = await api.get("/projects");

  return response.data.data as Project[];
}

export async function getProject(projectId: string): Promise<Project> {
  const response = await api.get(`/projects/${projectId}`);

  return response.data.data as Project;
}

export async function createProject(
  data: CreateProjectRequest,
): Promise<Project> {
  const response = await api.post("/projects", data);

  return response.data.data as Project;
}

export async function updateProject(
  projectId: string,
  data: CreateProjectRequest,
): Promise<Project> {
  const response = await api.patch(`/projects/${projectId}`, data);

  return response.data.data as Project;
}

export async function deleteProject(projectId: string): Promise<void> {
  await api.delete(`/projects/${projectId}`);

  localStorage.removeItem(`researchos-chat-${projectId}`);
}
