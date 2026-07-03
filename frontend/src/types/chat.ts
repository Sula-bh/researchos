export interface ChatSource {
  source: string;
  dataset: string;
}

export interface ChatResponse {
  message: string;
  sources: ChatSource[];
}

export interface ChatMessageType {
  role: "user" | "assistant";
  content: string;
  sources?: ChatSource[];
}
