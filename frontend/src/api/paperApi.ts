import api from "@/lib/api";
import type { Paper } from "@/types/paper";

export async function getPapers(projectId: string) {
  const response = await api.get(`/projects/${projectId}/papers`);

  return response.data.data as Paper[];
}

export async function uploadPaper(projectId: string, file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(`/projects/${projectId}/papers`, formData);

  return response.data.data as Paper;
}
