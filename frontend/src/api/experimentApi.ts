import api from "@/lib/api";
import type { Experiment, ExperimentStatus } from "@/types/experiment";

export async function getExperiments(projectId: string): Promise<Experiment[]> {
  const response = await api.get(`/projects/${projectId}/experiments`);

  return response.data.data as Experiment[];
}

export async function getExperiment(experimentId: string): Promise<Experiment> {
  const response = await api.get(`/experiments/${experimentId}`);

  return response.data.data as Experiment;
}

export async function createExperiment(
  projectId: string,
  data: {
    title: string;
    objective?: string;
    methodology?: string;
    results?: string;
    conclusion?: string;
    status?: ExperimentStatus;
  },
): Promise<Experiment> {
  const response = await api.post(`/projects/${projectId}/experiments`, data);

  return response.data.data as Experiment;
}

export async function updateExperiment(
  experimentId: string,
  data: {
    title?: string;
    objective?: string;
    methodology?: string;
    results?: string;
    conclusion?: string;
    status?: ExperimentStatus;
  },
): Promise<Experiment> {
  const response = await api.patch(`/experiments/${experimentId}`, data);

  return response.data.data as Experiment;
}

export async function deleteExperiment(experimentId: string): Promise<void> {
  await api.delete(`/experiments/${experimentId}`);
}
