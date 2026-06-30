export interface Paper {
  id: string;
  project_id: string;
  title: string;
  authors: string | null;
  abstract: string | null;
  file_name: string;
  storage_key: string;
  created_at: string;
}
