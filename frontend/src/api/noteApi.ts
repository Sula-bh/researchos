import api from "@/lib/api";
import type { Note } from "@/types/note";

export async function getNotes(projectId: string): Promise<Note[]> {
  const response = await api.get(`/projects/${projectId}/notes`);

  return response.data.data as Note[];
}

export async function getNote(noteId: string): Promise<Note> {
  const response = await api.get(`/notes/${noteId}`);

  return response.data.data as Note;
}

export async function createNote(
  projectId: string,
  data: {
    title: string;
    content: string;
  },
): Promise<Note> {
  const response = await api.post(`/projects/${projectId}/notes`, data);

  return response.data.data as Note;
}

export async function updateNote(
  noteId: string,
  data: {
    title?: string;
    content?: string;
  },
): Promise<Note> {
  const response = await api.patch(`/notes/${noteId}`, data);

  return response.data.data as Note;
}

export async function deleteNote(noteId: string): Promise<void> {
  await api.delete(`/notes/${noteId}`);
}
