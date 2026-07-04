export interface Paper {
  id: string;
  project_id: string;

  title: string;
  authors: string | null;
  abstract: string | null;

  file_name: string;
  storage_key: string;

  ai_status: string;
  ai_summary: string | null;
  ai_error: string | null;
  processed_at: string | null;

  created_at: string;
}
