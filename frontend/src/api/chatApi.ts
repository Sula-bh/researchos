import api from "@/lib/api";

import type { ChatResponse } from "@/types/chat";

export async function chat(
  projectId: string,
  message: string,
): Promise<ChatResponse> {
  const response = await api.post(`/projects/${projectId}/chat`, {
    message,
  });

  return response.data.data as ChatResponse;
}
