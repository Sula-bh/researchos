export interface Project {
  id: string;
  title: string;
  description: string | null;
  memory_dataset_id: string | null;
  created_at: string;
  updated_at: string;
}
