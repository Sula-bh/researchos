export const EXPERIMENT_STATUSES = [
  "Draft",
  "Running",
  "Completed",
  "Archived",
] as const;

export type ExperimentStatus = (typeof EXPERIMENT_STATUSES)[number];

export interface Experiment {
  id: string;
  project_id: string;
  title: string;
  objective: string;
  methodology: string;
  results: string;
  conclusion: string;
  status: ExperimentStatus;
  created_at: string;
  updated_at: string;
}
