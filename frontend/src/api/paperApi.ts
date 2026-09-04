import api from "@/lib/api";
import type { Paper } from "@/types/paper";

export async function getPapers(projectId: string): Promise<Paper[]> {
  const response = await api.get(`/projects/${projectId}/papers`);

  return response.data.data as Paper[];
}

export async function getPaper(paperId: string): Promise<Paper> {
  const response = await api.get(`/papers/${paperId}`);

  return response.data.data as Paper;
}

export async function uploadPaper(
  projectId: string,
  file: File,
): Promise<Paper> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post(`/projects/${projectId}/papers`, formData);

  return response.data.data as Paper;
}

export async function deletePaper(paperId: string): Promise<void> {
  await api.delete(`/papers/${paperId}`);
}

export async function openPaper(paperId: string): Promise<void> {
  const response = await api.get(`/papers/${paperId}/download`, {
    responseType: "blob",
  });

  const blobUrl = URL.createObjectURL(response.data);

  window.open(blobUrl, "_blank", "noopener,noreferrer");

  // Give the new tab time to load the blob before releasing it.
  setTimeout(() => {
    URL.revokeObjectURL(blobUrl);
  }, 60_000);
}
