import api from "@/lib/api";
import type { Project } from "@/types/project";

export async function getProjects() {
  const response = await api.get("/projects");

  return response.data.data as Project[];
}
