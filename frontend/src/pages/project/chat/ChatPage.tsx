import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { chat } from "@/api/chatApi";
import { getErrorMessage } from "@/lib/error";
import type { ChatMessageType } from "@/types/chat";

import ChatEmptyState from "./components/ChatEmptyState";
import ChatInput from "./components/ChatInput";
import ChatMessage from "./components/ChatMessage";
import DeleteChatDialog from "./components/DeleteChatDialog";

export default function ChatPage() {
  const { projectId } = useParams();

  const storageKey = projectId ? `researchos-chat-${projectId}` : "";

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  async function handleSend() {
    if (!projectId) return;

    const message = input.trim();

    if (!message) return;

    try {
      setLoading(true);

      setMessages((previous) => [
        ...previous,
        {
          role: "user",
          content: message,
        },
      ]);

      setInput("");

      const response = await chat(projectId, message);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: response.message,
          sources: response.sources,
        },
      ]);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!projectId) return;

    const savedMessages = localStorage.getItem(storageKey);

    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages) as ChatMessageType[]);
      } catch {
        localStorage.removeItem(storageKey);
      }
    }

    setInitialized(true);
  }, [projectId, storageKey]);

  useEffect(() => {
    if (!initialized || !projectId) return;

    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, initialized, projectId, storageKey]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  function handlePromptClick(prompt: string) {
    setInput(prompt);
  }

  function handleClearChat() {
    if (!storageKey) return;

    localStorage.removeItem(storageKey);

    setMessages([]);

    setShowDeleteDialog(false);

    toast.success("Chat cleared.");
  }

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}

      <div className="flex-1 overflow-y-auto rounded-xl border bg-background p-6">
        <ChatEmptyState onPromptClick={handlePromptClick} />

        <div className="space-y-6">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Conversation</h2>

            {messages.length > 0 && (
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted"
              >
                <Trash2 className="h-4 w-4" />
                Clear Conversation
              </button>
            )}
          </div>

          {loading && (
            <ChatMessage
              loading
              message={{
                role: "assistant",
                content: "",
              }}
            />
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}

      <div className="mt-4">
        <ChatInput
          value={input}
          loading={loading}
          onChange={setInput}
          onSend={handleSend}
        />
      </div>
      <DeleteChatDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onDelete={handleClearChat}
      />
    </div>
  );
}
